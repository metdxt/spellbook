/**
 * Check if value is null or undefined.
 */
export function isVoid<T>(
  value: T | null | undefined,
): value is null | undefined {
  return value === null || value === undefined;
}

/**
 * Ensure value is not null or undefined. Throws an error otherwise.
 * @param value value to check.
 * @param message optional custom error message.
 * @returns
 */
export function nonVoid<T>(
  value: T | null | undefined,
  message: string | undefined = undefined,
): T {
  if (isVoid(value)) {
    throw new Error(message ?? 'Value is void.');
  }
  return value;
}

/**
 * Get value of environment variable. Variable must be set. Throws an error otherwise.
 * @param varName name of the envirnoment variable.
 * @returns
 */
export function nonVoidEnv(varName: string): string {
  return nonVoid(
    Deno.env.get(varName),
    `Environment variable ${varName} is not set.`,
  );
}
