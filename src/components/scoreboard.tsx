/**
 * astro/src/pages/docs/_custom/scoreboard.tsx
 * Interactive Bridgette strike tracker.
 * Folder boundary: scoreboard custom content; generic Docs state and chrome remain in the parent folder.
 */

/*//////////////////////////////////////////////////
IMPORTS
//////////////////////////////////////////////////*/

// API
import { cn } from '@utils';
import { useEffect, useRef, useState } from 'react';

// COMPONENTS
import { ErrorBoundary } from '@components/ErrorBoundary';
import Marquee from '@components/Marquee';
import { Button } from '@ui/button';
import { Input } from '@ui/input';
import { Select, SelectContent, SelectItem, SelectSeparator, SelectTrigger, SelectValue } from '@ui/select';
import { CarbonIcon } from './carbon-icons';
import { neonData } from '../lib/neon';
import { notifyError } from '../lib/error-notifications';

// DATA
import { IMG_DARKEN } from '@components/tile';
import { clampStrikeCount as clamp, coercePitchers as coerce } from '../lib/pitchers';
import { persistShareAndCopyLink } from '../lib/scoreboard-share';

// TYPES
import type { PitcherData } from '@lib/types';

/*//////////////////////////////////////////////////
DATA
//////////////////////////////////////////////////*/

const ACTION_ADD = '__add_pitcher__';
const ACTION_DELETE = '__delete_pitcher__';
const COL_CLASSES: Record<1 | 2 | 3, string> = {
	1: 'col-start-1',
	2: 'col-start-2',
	3: 'col-start-3',
};
const DEFAULT_PITCHERS: PitcherData[] = [
	{ id: 'kai', name: 'Kai', strikes: 1 },
	{ id: 'daniel', name: 'Daniel', strikes: 1 },
];
/** Neon Data API projection for an account-owned or shared scoreboard. */
type DashboardRec = {
	id: string;
	owner_id: string;
	title: string;
	pitchers: PitcherData[];
};

/*//////////////////////////////////////////////////
HELPERS
//////////////////////////////////////////////////*/

/*//////////////////////////////////////////////////
COMPONENT
//////////////////////////////////////////////////*/

/**
 * Renders the account-scoped scoreboard and its strike and sharing controls.
 *
 * @param account - Signed-in account whose scoreboards are available here.
 * @param signOut - Callback that ends the current account session.
 *
 * @returns A JSX element representing the scoreboard dashboard interface.
 */
function ScoreboardContent({ account, signOut }: { account: { id: string; email: string }; signOut: () => Promise<void> }): React.JSX.Element {
	// STATES
	const [flash, setFlash] = useState(false);
	const [pitchers, setPitchers] = useState<PitcherData[]>([]);
	const [selId, setSelId] = useState<string | null>(null);
	const [dashboards, setDashboards] = useState<DashboardRec[]>([]);
	const [dashboardId, setDashboardId] = useState<string | null>(null);
	const [strikeeEmail, setStrikeeEmail] = useState('');
	const [shareMsg, setShareMsg] = useState<string | null>(null);
	const flashState = useRef(false);
	let selPitcher: PitcherData | null = null;
	for (const pitcher of pitchers) {
		if (pitcher.id === selId) {
			selPitcher = pitcher;
			break;
		}
	}
	const strikes = clamp(selPitcher?.strikes ?? 1);
	let currDashboard: DashboardRec | null = null;
	for (const board of dashboards) {
		if (board.id === dashboardId) {
			currDashboard = board;
			break;
		}
	}
	/** Applies a pitcher list and keeps the selected pitcher in that list.
	 * @param nPitchers - Updated pitcher records to store in component state.
	 * @param nId - Preferred pitcher identifier when it remains in the updated list.
	 */
	function commit(nPitchers: PitcherData[], nId?: string | null): void {
		let selectedId: string | null = null;
		if (nId) for (const pitcher of nPitchers) if (pitcher.id === nId) selectedId = nId;
		const sel = selectedId || nPitchers[0]?.id || null;
		setPitchers(nPitchers);
		setSelId(sel);
	}

	/** Saves the current pitcher list to its selected scoreboard.
	 * @param nPitchers - Pitcher records to persist to the active scoreboard.
	 */
	async function persist(nPitchers: PitcherData[]): Promise<void> {
		try {
			if (!dashboardId) throw new Error('Choose a scoreboard before saving.');
			await neonData<DashboardRec[]>(`scoreboards?id=eq.${encodeURIComponent(dashboardId)}`, {
				method: 'PATCH',
				headers: { Prefer: 'return=representation' },
				body: JSON.stringify({
					pitchers: nPitchers,
					updated_at: new Date().toISOString(),
				}),
			});
		} catch (caught: unknown) {
			notifyError('Scoreboard save', caught, 'Failed to sync dashboard.');
		}
	}
	/** Changes the active pitcher’s strike count and persists the result.
	 * @param amount - One strike to add or remove from the active pitcher.
	 */
	function changeStrikes(amount: -1 | 1): void {
		if (!selPitcher) return;
		const n: PitcherData[] = [];
		for (const pitcher of pitchers) n.push(pitcher.id === selPitcher.id ? { ...pitcher, strikes: clamp(strikes + amount) } : pitcher);
		commit(n, selPitcher.id);
		void persist(n);
	}

	/** Loads account scoreboards, creating the default board when needed. */
	async function loadDashboards(): Promise<void> {
		try {
			let recs = await neonData<DashboardRec[]>('scoreboards?select=id,owner_id,title,pitchers&order=created_at.asc');
			if (!recs.length) {
				recs = await neonData<DashboardRec[]>('scoreboards?select=id,owner_id,title,pitchers', {
					method: 'POST',
					headers: { Prefer: 'return=representation' },
					body: JSON.stringify({
						title: 'Bridgette’s Strikes',
						pitchers: DEFAULT_PITCHERS,
					}),
				});
			}
			const reqId = new URLSearchParams(window.location.search).get('board');
			let selected = recs[0];
			for (const board of recs) if (board.id === reqId) selected = board;
			if (!selected) throw new Error('No scoreboard is available for this account.');
			setDashboards(recs);
			setDashboardId(selected.id);
			const selectedPitchers = coerce(selected);
			setPitchers(selectedPitchers);
			setSelId(selectedPitchers[0]?.id ?? null);
		} catch (caught: unknown) {
			notifyError('Scoreboard load', caught, 'Failed to load account scoreboards.');
		}
	}

	/** Grants a strikee access to the owned scoreboard and copies its link.
	 * @param event - Share form submission to validate and handle.
	 */
	async function shareWithStrikee(event: React.SubmitEvent<HTMLFormElement>): Promise<void> {
		event.preventDefault();
		if (!currDashboard || currDashboard.owner_id !== account.id) return;
		setShareMsg(null);
		try {
			const email = strikeeEmail.trim().toLowerCase();
			if (email === account.email.toLowerCase()) throw new Error('Choose the strikee’s email address.');
			const shareUrl = new URL(`/?board=${encodeURIComponent(currDashboard.id)}`, window.location.origin).toString();
			/** Stores the invitation before the clipboard step can fail. */
			async function saveStrikeeInvitation(): Promise<void> {
				await neonData('scoreboard_shares', {
					method: 'POST',
					headers: { Prefer: 'resolution=merge-duplicates,return=minimal' },
					body: JSON.stringify({
						scoreboard_id: currDashboard.id,
						strikee_email: email,
					}),
				});
			}
			/** Copies the stored invitation URL for the current browser session. */
			async function copyStrikeeInvitation(): Promise<void> {
				if (!navigator.clipboard?.writeText) throw new Error('Clipboard writing is unavailable.');
				await navigator.clipboard.writeText(shareUrl);
			}
			const copied = await persistShareAndCopyLink(saveStrikeeInvitation, copyStrikeeInvitation);
			setShareMsg(copied ? `Shared with ${email}. The scoreboard link has been copied.` : `Shared with ${email}. Copy this link: ${shareUrl}`);
			setStrikeeEmail('');
		} catch (caught) {
			notifyError('Scoreboard share', caught, 'Could not share this scoreboard.');
		}
	}

	/** Starts the initial account scoreboard load when this view mounts. */
	function loadDashboardsOnMount(): void {
		void loadDashboards();
	}
	/** Toggles the image flash while the active pitcher has three strikes.
	 * @returns An interval cleanup callback when flashing starts, or `undefined` otherwise.
	 */
	function manageStrikeFlash(): (() => void) | undefined {
		if (strikes !== 3) {
			flashState.current = false;
			setFlash(false);
			return undefined;
		}
		/** Flips the flash state for the next interval tick. */
		function toggleFlash(): void {
			flashState.current = !flashState.current;
			setFlash(flashState.current);
		}
		const interval = window.setInterval(toggleFlash, 225);
		/** Clears the interval that toggles the image flash. */
		function stopFlash(): void {
			window.clearInterval(interval);
		}
		return stopFlash;
	}
	/** Signs out the current account when its header control is activated. */
	function handleSignOut(): void {
		void signOut();
	}
	/** Selects a scoreboard and updates the shareable URL.
	 * @param i - Identifier of the scoreboard selected in the menu.
	 */
	function selectDashboard(i: string): void {
		let selectedBoard: DashboardRec | undefined;
		for (const board of dashboards) if (board.id === i) selectedBoard = board;
		if (!selectedBoard) return;
		setDashboardId(selectedBoard.id);
		const selectedPitchers = coerce(selectedBoard);
		setPitchers(selectedPitchers);
		setSelId(selectedPitchers[0]?.id ?? null);
		window.history.replaceState(null, '', `/?board=${encodeURIComponent(selectedBoard.id)}`);
	}
	/** Handles selecting, adding, or deleting the active pitcher.
	 * @param v - Selected pitcher identifier or an add/delete action sentinel.
	 */
	function selectPitcher(v: string): void {
		if (v === ACTION_ADD) {
			const name = window.prompt('Pitcher name')?.trim();
			if (!name) return;
			const next = [...pitchers, { id: crypto.randomUUID(), name, strikes: 1 }];
			commit(next, next.at(-1)?.id ?? null);
			void persist(next);
			return;
		}
		if (v === ACTION_DELETE) {
			if (!selPitcher || !window.confirm(`Delete ${selPitcher.name}?`)) return;
			const next: PitcherData[] = [];
			for (const pitcher of pitchers) if (pitcher.id !== selPitcher.id) next.push(pitcher);
			commit(next);
			void persist(next);
			return;
		}
		commit(pitchers, v);
	}
	/** Updates the controlled strikee email field.
	 * @param e - Input event containing the latest email value.
	 */
	function changeStrikeeEmail(e: React.ChangeEvent<HTMLInputElement>): void {
		setStrikeeEmail(e.target.value);
	}
	/** Submits the current scoreboard share request.
	 * @param e - Share form submission forwarded to the async handler.
	 */
	function submitShare(e: React.FormEvent<HTMLFormElement>): void {
		void shareWithStrikee(e);
	}
	/** Decreases strikes on the active pitcher. */
	function decreaseStrikes(): void {
		changeStrikes(-1);
	}
	/** Increases strikes on the active pitcher. */
	function increaseStrikes(): void {
		changeStrikes(1);
	}
	const dashboardOptions: React.ReactNode[] = [];
	for (const board of dashboards) {
		dashboardOptions.push(
			<SelectItem key={board.id} value={board.id}>
				{board.title}
				{board.owner_id === account.id ? ' · creator' : ' · shared'}
			</SelectItem>,
		);
	}
	const pitcherOptions: React.ReactNode[] = [];
	for (const pitcher of pitchers) {
		pitcherOptions.push(
			<SelectItem key={pitcher.id} value={pitcher.id}>
				{pitcher.name} · 0{clamp(pitcher.strikes)}{' '}
			</SelectItem>,
		);
	}
	// EFFECTS
	useEffect(loadDashboardsOnMount, []);
	useEffect(manageStrikeFlash, [strikes]);

	// RENDER
	return (
		<main className='grid min-h-screen grid-rows-[auto_3.5rem_1fr] bg-primary-1'>
			{/* HEADER */}
			<section className='flex flex-col gap-4 bg-secondary-12 p-6 py-20 text-secondary-1 shadow md:flex-row md:items-end md:justify-between'>
				{/* logo */}
				<div>
					<h1 className='text-7xl outline-rose-50' style={{ fontFamily: '"Playball", cursive' }}>
						Bridgette&apos;s Strikes
					</h1>
					<p className='-mt-2 pl-2 text-xl'>Est. 2026</p>
					<p className='mt-2 pl-2 text-sm text-secondary-2'>{account.email}</p>
					<Button type='button' variant='primary-underline' size='link' className='mt-1 pl-2 text-left text-xs text-secondary-2' onClick={handleSignOut}>
						Sign out
					</Button>
				</div>
				{/* pitcher */}
				<div className='w-full md:w-56'>
					<p className='mb-2 font-mono text-2xl'>PITCHER</p>
					{dashboards.length > 1 && (
						<label className='mb-2 grid gap-1 text-xs text-secondary-2'>
							SCOREBOARD
							<Select value={dashboardId ?? ''} onValueChange={selectDashboard}>
								<SelectTrigger className='border-secondary-5 bg-secondary-11 px-2 text-secondary-1' aria-label='Select scoreboard'>
									<SelectValue />
								</SelectTrigger>
								<SelectContent className='border-secondary-5 bg-secondary-11 text-secondary-1'>{dashboardOptions}</SelectContent>
							</Select>
						</label>
					)}
					<Select onValueChange={selectPitcher} value={selId ?? undefined}>
						<SelectTrigger className='border-secondary-5 bg-secondary-11 font-mono text-secondary-1 data-[placeholder]:text-secondary-2' aria-label='Select pitcher'>
							<SelectValue placeholder='Select pitcher' />
						</SelectTrigger>
						{/* prettier-ignore */}
						<SelectContent className='border-secondary-5 bg-primary-1 text-primary-12'>
							{pitcherOptions}
							<SelectSeparator />
							<SelectItem value={ACTION_ADD}>Add pitcher...</SelectItem>
							<SelectItem disabled={!selPitcher} value={ACTION_DELETE}>{selPitcher ? `Delete ${selPitcher.name}` : 'Delete pitcher'}</SelectItem>
						</SelectContent>
					</Select>
					{currDashboard?.owner_id === account.id && (
						<form onSubmit={submitShare} className='mt-3 grid gap-2'>
							<label className='grid gap-1 text-xs text-secondary-2' htmlFor='strikee-email'>
								Share with a strikee
							</label>
							<Input
								id='strikee-email'
								type='email'
								required
								placeholder='strikee@example.com'
								value={strikeeEmail}
								onChange={changeStrikeeEmail}
								className='border-secondary-5 bg-secondary-11 text-secondary-1 placeholder:text-secondary-3'
							/>
							<Button type='submit' variant='primary-outline' className='border-secondary-5 px-3 text-secondary-1 hover:bg-secondary-11'>
								Share scoreboard link
							</Button>
							{shareMsg && (
								<p role='status' className='text-xs text-secondary-2'>
									{shareMsg}
								</p>
							)}
						</form>
					)}
					{currDashboard?.owner_id !== account.id && <p className='mt-2 text-xs text-secondary-2/80'>Shared with you by the creator.</p>}
				</div>
				{/* strikes*/}
				<div className='grid gap-x-2'>
					<p className='col-span-3 mb-2 font-mono text-2xl'>STRIKE</p>
					<Button
						variant='secondary-tonal'
						size='xl'
						className='bg-secondary-1 text-secondary-12 hover:bg-secondary-2'
						aria-label='Decrease strike count'
						disabled={!selPitcher || strikes === 1}
						onClick={decreaseStrikes}
					>
						<CarbonIcon name='subtract' className='text-3xl' />
					</Button>
					<p className='flex size-14 items-center justify-center rounded border border-secondary-4 bg-primary-12 font-mono text-2xl text-primary-1'>0{strikes}</p>
					<Button
						variant='secondary-tonal'
						size='xl'
						className='bg-secondary-1 text-secondary-12 hover:bg-secondary-2'
						aria-label='Increase strike count'
						disabled={!selPitcher || strikes === 3}
						onClick={increaseStrikes}
					>
						<CarbonIcon name='add' className='text-3xl' />
					</Button>
				</div>
			</section>

			{/* MARQUEE */}
			<div
				className={cn('flex items-center overflow-hidden border-double border-secondary-8 bg-primary-1 transition-opacity duration-75', strikes === 3 ? 'h-full border-y-[6px]' : 'h-0 border-t-[6px]')}
				aria-hidden={strikes !== 3}
			>
				<Marquee terms={["YOU'RE OUT"]} duration={20000} reverse className='!mb-0 font-thin leading-none text-secondary-12' />
			</div>

			{/* IMAGES */}
			<section className='row-start-3 mt-3 grid h-40 min-h-0 grid-cols-[auto_1fr_1fr_auto] items-stretch bg-primary-1 pr-6'>
				<div className={cn('row-start-1 flex h-full items-end justify-end', COL_CLASSES[strikes])}>
					<img
						src={strikes === 3 && flash ? '/images/bridgette/baseball-2.png' : '/images/bridgette/baseball-1.png'}
						alt='Illustration of Bridgette batting'
						className={cn('h-96 w-auto max-w-full object-contain transition-all duration-300', IMG_DARKEN)}
					/>
				</div>
				<div className='col-start-4 flex h-full items-end justify-start'>
					<img src='/images/bridgette/pitcher-2.png' alt='Illustration of the pitcher' className={cn('h-96 w-auto max-w-full object-contain', IMG_DARKEN)} />
				</div>
			</section>
		</main>
	);
}

/**
 * Renders the Bridgette controls and image board.
 *
 * @param account - Signed-in account whose scoreboards are available here.
 * @param signOut - Callback that ends the current account session.
 * @returns A JSX element representing the strike tracker wrapped in an ErrorBoundary.
 */
export default function Scoreboard({ account, signOut }: { account: { id: string; email: string }; signOut: () => Promise<void> }): React.JSX.Element {
	return (
		<ErrorBoundary name='Scoreboard'>
			<ScoreboardContent account={account} signOut={signOut} />
		</ErrorBoundary>
	);
}
