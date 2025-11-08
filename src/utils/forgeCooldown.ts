/* --- Types --- */
export type Arguments = {
	cooldownMs: number;
	cooldownItem: string;
};

/* --- forgeCooldown Function --- */
// This function is used to manage the cooldown for the API.
export const forgeCooldown = ({ cooldownMs, cooldownItem }: { cooldownMs: number; cooldownItem: string }) => {
	const now = Date.now();
	const lastClickTime = parseInt(localStorage.getItem(cooldownItem) || '0');

	return now - lastClickTime < cooldownMs;
};
