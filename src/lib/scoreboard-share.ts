/** Persists a scoreboard invitation before attempting optional clipboard assistance.
 * @param persistShare - Request that stores the invitation for the recipient.
 * @param copyLink - Browser operation that copies the share URL.
 * @returns Whether the invitation was copied after it was saved.
 */
export async function persistShareAndCopyLink(persistShare: () => Promise<unknown>, copyLink: () => Promise<void>): Promise<boolean> {
	await persistShare();
	try {
		await copyLink();
		return true;
	} catch {
		return false;
	}
}
