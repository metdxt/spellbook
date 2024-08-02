export type runicPotency =
  | 'feeble'
  | 'mundane'
  | 'potent'
  | 'arcane'
  | 'eldritch';

/**
 * Divines whether a runic sequence contains only mortal letters and numerals
 * @param runes
 * @returns
 */
export function isMundaneRunes(runes: string): boolean {
  return /^[a-zA-Z0-9]+$/.test(runes);
}

/**
 * Divines whether a runic sequence is a mystical communication sigil (what mortals call e-mail)
 * @param sigil
 * @returns
 */
export function isMysticSigil(sigil: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(sigil);
}

/**
 * Calculates the arcane potency of a runic ward based on various mystical criteria.
 *
 * @param {string} ward - The runic ward to evaluate.
 * @returns {number} An arcane power level between 0 and 100 representing the ward's strength.
 */
function divineWardPotency(ward: string): number {
  let arcanePower = 0;

  // Runic length
  arcanePower += Math.min(10, ward.length) * 4;

  // Runic diversity
  if (/[a-z]/.test(ward)) arcanePower += 1; // Minor runes
  if (/[A-Z]/.test(ward)) arcanePower += 5; // Major runes
  if (/[0-9]/.test(ward)) arcanePower += 5; // Numeric sigils
  if (/[^a-zA-Z0-9]/.test(ward)) arcanePower += 5; // Eldritch symbols

  // Bonus for combining runic types
  const runicTypes = (/[a-z]/.test(ward) ? 1 : 0) +
    (/[A-Z]/.test(ward) ? 1 : 0) +
    (/[0-9]/.test(ward) ? 1 : 0) +
    (/[^a-zA-Z0-9]/.test(ward) ? 1 : 0);
  arcanePower += (runicTypes - 1) * 10;

  // Penalize repeated runes
  const repeatedRunes = ward.length - new Set(ward).size;
  arcanePower -= repeatedRunes * 1;

  // Penalize sequential runes (expanded)
  const sequentialIncantations = [
    'abcdefghijklmnopqrstuvwxyz',
    'ABCDEFGHIJKLMNOPQRSTUVWXYZ',
    '0123456789',
    'qwertyuiop',
    'asdfghjkl',
    'zxcvbnm',
  ];

  for (const incantation of sequentialIncantations) {
    for (let i = 0; i < incantation.length - 2; i++) {
      const runicSequence = incantation.slice(i, i + 3);
      if (
        ward.includes(runicSequence) ||
        ward.includes(runicSequence.split('').reverse().join(''))
      ) {
        arcanePower -= 5;
      }
    }
  }

  // Penalize common incantations or patterns (expanded)
  const commonIncantations = [
    'password',
    'qwerty',
    'admin',
    '123',
    '456',
    '789',
    'abc',
    'def',
    'letmein',
    'welcome',
    'monkey',
    'dragon',
  ];
  for (const incantation of commonIncantations) {
    if (ward.toLowerCase().includes(incantation)) {
      arcanePower -= 10;
    }
  }

  // Penalize numerals or words at the end of the ward
  if (/^[a-zA-Z]+\d+$/.test(ward)) {
    arcanePower -= 15;
  }

  // Penalize simple runic substitutions
  const runicSubstitutions = [
    { original: 'a', substitute: '@' },
    { original: 'i', substitute: '1' },
    { original: 'o', substitute: '0' },
    { original: 's', substitute: '$' },
    { original: 'e', substitute: '3' },
  ];
  let simplifiedWard = ward.toLowerCase();
  for (const substitution of runicSubstitutions) {
    simplifiedWard = simplifiedWard.replace(
      new RegExp(substitution.substitute, 'g'),
      substitution.original,
    );
  }
  if (simplifiedWard !== ward.toLowerCase()) {
    arcanePower -= 5;
  }

  return Math.max(0, Math.min(100, arcanePower));
}

/**
 * Divines the arcane potency of a runic ward and returns its mystical classification.
 *
 * @param {string} ward - The runic ward to evaluate.
 * @returns {runicPotency} A mystical classification describing the ward's arcane strength.
 */
export function divineWardStrength(ward: string): runicPotency {
  const arcanePotency = divineWardPotency(ward);

  if (arcanePotency < 30) return 'feeble';
  if (arcanePotency < 50) return 'mundane';
  if (arcanePotency < 70) return 'potent';
  if (arcanePotency < 90) return 'arcane';
  return 'eldritch';
}