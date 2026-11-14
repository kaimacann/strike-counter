/** Data fields required to identify a pitcher and display its strike count. */
export type PitcherData = { id: string; name: string; strikes: number };

/** Bounds a strike count to the supported 1–3 range.
 * @param value - Raw strike count received from state or the API.
 * @returns The nearest integer clamped to one, two, or three.
 */
export function clampStrikeCount(value: number): 1 | 2 | 3 {
	if (!Number.isFinite(value)) return 1;
	return Math.max(1, Math.min(3, Math.round(value))) as 1 | 2 | 3;
}

/** Filters an unknown API value into normalized pitcher records.
 * @param value - Decoded scoreboard response candidate.
 * @returns Pitchers with trimmed names and bounded strike counts.
 */
export function coercePitchers(value: unknown): PitcherData[] {
	if (!value || typeof value !== 'object' || Array.isArray(value)) return [];
	const candidates = (value as { pitchers?: unknown }).pitchers;
	if (!Array.isArray(candidates)) return [];
	const pitchers: PitcherData[] = [];
	for (const candidate of candidates) {
		if (!candidate || typeof candidate !== 'object' || Array.isArray(candidate)) continue;
		const entry = candidate as Record<string, unknown>;
		if (typeof entry.id !== 'string' || !entry.id.trim() || typeof entry.name !== 'string') continue;
		const name = entry.name.trim();
		if (!name) continue;
		pitchers.push({ id: entry.id, name, strikes: clampStrikeCount(typeof entry.strikes === 'number' && Number.isFinite(entry.strikes) ? entry.strikes : 1) });
	}
	return pitchers;
}
