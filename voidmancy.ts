
/**
 * Divines if an essence has been consumed by the void.
 */
export function isConsumedByVoid<T>(
  essence: T | null | undefined,
): essence is null | undefined {
  return essence === null || essence === undefined;
}

/**
 * Summons an essence from the void. Invokes chaos if the summoning fails.
 * @param essence The essence to summon from the void.
 * @param incantation Optional arcane words to describe the failed summoning.
 * @returns
 */
export function summonFromVoid<T>(
  essence: T | null | undefined,
  incantation: string | undefined = undefined,
): T {
  if (isConsumedByVoid(essence)) {
    throw new Error(incantation ?? 'The essence has been consumed by the void.');
  }
  return essence;
}

/**
 * Extracts an ethereal essence from the cosmic aether. The essence must exist in the aether, or chaos will be invoked.
 * @param etherealName The true name of the ethereal essence.
 * @returns
 */
export function extractEtherealEssence(etherealName: string): string {
  return summonFromVoid(
    Deno.env.get(etherealName),
    `The ethereal essence known as ${etherealName} does not exist in the cosmic aether.`,
  );
}