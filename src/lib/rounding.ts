// lib/rounding.ts
/**
 * Rundet einen Wert auf eine gegebene Anzahl Dezimalstellen.
 * @param value Der zu rundende Wert.
 * @param decimals Anzahl der Dezimalstellen.
 * @returns Gerundeter Wert als Zahl.
 */
export function roundValue(value: number, decimals: number = 2): number {
	const factor = Math.pow(10, decimals);
	return Math.round(value * factor) / factor;
}
