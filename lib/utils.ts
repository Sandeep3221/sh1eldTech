/**
 * Minimal class-name joiner.
 *
 * Deliberately dependency-free — the project has no `clsx`/`tailwind-merge`
 * and this covers every case the codebase actually needs. It does not attempt
 * Tailwind conflict resolution; put conditional classes in the condition
 * rather than relying on later-wins merge semantics.
 */
export function cn(...parts: Array<string | false | null | undefined>): string {
  return parts.filter(Boolean).join(' ');
}

/** Clamp a number into an inclusive range. */
export function clamp(value: number, min: number, max: number): number {
  return Math.min(max, Math.max(min, value));
}

/** Linear interpolation. */
export function lerp(from: number, to: number, t: number): number {
  return from + (to - from) * t;
}

/**
 * Normalise `value` from the range [inMin, inMax] into [0, 1], clamped.
 * Returns 0 when the input range has no width, so callers never see NaN.
 */
export function progress(value: number, inMin: number, inMax: number): number {
  if (inMax === inMin) return 0;
  return clamp((value - inMin) / (inMax - inMin), 0, 1);
}

/** Format a 1-based index as a zero-padded label, e.g. 3 -> "03". */
export function padIndex(index: number, width = 2): string {
  return String(index).padStart(width, '0');
}
