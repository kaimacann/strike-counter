import { useEffect, useState, type ChangeEvent, type SubmitEvent } from 'react';
import { Toaster } from 'sonner';
import { notifyError } from '../lib/error-notifications';
import { getNeonSession, neonAuth, neonIsConfigured } from '../lib/neon';
import Scoreboard from './scoreboard';
import { Button } from './ui/button';
import { Input } from './ui/input';
const BORDER_SECONDARY_5_BG_PRIMARY_1_CLASS = 'border-secondary-5 bg-primary-1';

/*//////////////////////////////////////////////////
CLASSES
//////////////////////////////////////////////////*/
const GRID_GAP_1_TEXT_SM_CLASS = 'grid gap-1 text-sm';

/**
 * Shows sign-in or account creation before exposing the user's scoreboards.
 *
 * @returns The account loading, authentication, or scoreboard view for the current session.
 */
export default function AccountGate(): React.JSX.Element {
	const [session, setSession] = useState<{
		user: {
			id: string;
			name?: string;
			email: string;
		};
	} | null>(null);
	const [checking, setChecking] = useState(true);
	const [signup, setSignup] = useState(false);
	const [email, setEmail] = useState('');
	const [name, setName] = useState('');
	const [password, setPassword] = useState('');
	const [busy, setBusy] = useState(false);

	/** Checks the saved session when the account gate mounts.
	 * @returns Cleanup that prevents state updates after unmount.
	 */
	function checkSession(): () => void {
		let mounted = true;
		/** Applies a loaded session while the account gate is mounted.
		 * @param current - Session returned by Neon Auth.
		 */
		function applySession(current: Awaited<ReturnType<typeof getNeonSession>>): void {
			if (mounted) {
				setSession(current);
				setChecking(false);
			}
		}
		/** Reports a failed session lookup and finishes the loading state.
		 * @param caught - Session lookup failure.
		 */
		function reportSessionErr(caught: unknown): void {
			if (mounted) {
				setChecking(false);
				notifyError('Account session', caught, 'Unable to check your account session.');
			}
		}
		/** Marks the gate unmounted so pending requests cannot update it.
		 */
		function stopSessionUpdates(): void {
			mounted = false;
		}

		void getNeonSession().then(applySession).catch(reportSessionErr);
		if (!neonIsConfigured) notifyError('Account setup', new Error('Neon Auth and Data API URLs are not configured.'), 'Account sign-in is not configured.');
		return stopSessionUpdates;
	}
	useEffect(checkSession, []);

	/**
	 * Sends account credentials to Neon Auth and loads the resulting session.
	 *
	 * @param e - Browser form submission whose default navigation is prevented while authentication runs.
	 */
	async function submit(e: SubmitEvent<HTMLFormElement>): Promise<void> {
		e.preventDefault();
		setBusy(true);
		try {
			await neonAuth(signup ? 'sign-up/email' : 'sign-in/email', signup ? { name: name.trim(), email: email.trim(), password } : { email: email.trim(), password });
			const curr = await getNeonSession();
			if (!curr) throw new Error('Sign-in succeeded but the account session could not be loaded. Check the trusted domain in Neon Auth.');
			setSession(curr);
		} catch (caught) {
			notifyError('Account sign-in', caught, 'Account request failed.');
		} finally {
			setBusy(false);
		}
	}

	/** Ends the current Neon Auth session and returns to the sign-in form. */
	async function signOut(): Promise<void> {
		try {
			await neonAuth('sign-out', {});
			setSession(null);
		} catch (caught) {
			notifyError('Account sign-out', caught, 'Could not sign out.');
		}
	}

	/** Prevents native form navigation while starting an account request.
	 * @param e - Browser form submit event.
	 */
	function handleSubmit(e: SubmitEvent<HTMLFormElement>): void {
		void submit(e);
	}
	/** Copies the displayed name into account creation state.
	 * @param e - Name input change event.
	 */
	function handleNameChange(e: ChangeEvent<HTMLInputElement>): void {
		setName(e.target.value);
	}
	/** Copies the displayed email into sign-in state.
	 * @param e - Email input change event.
	 */
	function handleEmailChange(e: ChangeEvent<HTMLInputElement>): void {
		setEmail(e.target.value);
	}
	/** Copies the entered password into authentication state.
	 * @param e - Password input change event.
	 */
	function handlePasswordChange(e: ChangeEvent<HTMLInputElement>): void {
		setPassword(e.target.value);
	}
	/** Switches between account creation and sign-in forms. */
	function toggleSignup(): void {
		setSignup(!signup);
	}

	return (
		<>
			<Toaster
				position='top-right'
				richColors
				toastOptions={{
					duration: 8000,
					classNames: { error: 'toast-error-saturated' },
				}}
			/>
			{checking && <div className='grid min-h-screen place-items-center bg-primary-1 text-primary-12'>Loading account…</div>}
			{!checking && session && <Scoreboard account={{ id: session.user.id, email: session.user.email }} signOut={signOut} />}
			{!checking && !session && (
				<main className='grid min-h-screen place-items-center bg-primary-1 p-6 text-primary-12'>
					<section className='w-full max-w-md rounded-lg border border-secondary-5 bg-primary-2 p-8 shadow-sm'>
						<h1 className='mb-2 text-3xl' style={{ fontFamily: '"Playball", cursive' }}>
							Bridgette&apos;s Strikes
						</h1>
						<p className='mb-6 text-sm'>Sign in to keep your scoreboard with your account and share it with a strikee.</p>
						{!neonIsConfigured ? (
							<p role='status' className='rounded border border-secondary-6 bg-primary-1 p-4 text-sm'>
								Connect Neon Auth and the Data API to enable account sign-in.
							</p>
						) : (
							<form className='grid gap-4' onSubmit={handleSubmit}>
								{signup && (
									<label className={GRID_GAP_1_TEXT_SM_CLASS}>
										Name
										<Input required autoComplete='name' value={name} onChange={handleNameChange} className={BORDER_SECONDARY_5_BG_PRIMARY_1_CLASS} />
									</label>
								)}
								<label className={GRID_GAP_1_TEXT_SM_CLASS}>
									Email
									<Input required type='email' autoComplete='email' value={email} onChange={handleEmailChange} className={BORDER_SECONDARY_5_BG_PRIMARY_1_CLASS} />
								</label>
								<label className={GRID_GAP_1_TEXT_SM_CLASS}>
									Password
									<Input
										required
										type='password'
										autoComplete={signup ? 'new-password' : 'current-password'}
										minLength={8}
										value={password}
										onChange={handlePasswordChange}
										className={BORDER_SECONDARY_5_BG_PRIMARY_1_CLASS}
									/>
								</label>
								<Button variant='secondary' size='lg' disabled={busy}>
									{busy ? 'Please wait…' : signup ? 'Create account' : 'Sign in'}
								</Button>
								<Button type='button' variant='primary-underline' size='link' onClick={toggleSignup}>
									{signup ? 'Already have an account? Sign in' : 'Create an account'}
								</Button>
							</form>
						)}
					</section>
				</main>
			)}
		</>
	);
}
