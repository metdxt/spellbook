import { assertEquals } from 'jsr:@std/assert@1';
import { isMundaneRunes, isMysticSigil, divineWardStrength } from '../runecraft.ts';

Deno.test('isMundaneRunes', () => {
  assertEquals(isMundaneRunes('abcdefghijklmnopqrstuvwxyz1234567890'), true);
  assertEquals(isMundaneRunes('abcdefghijklmnopq rstuvwxyz1234567890'), false);
  assertEquals(isMundaneRunes('аabcdefghijklmnopqrstuvwxyz1234567890'), false);
});

Deno.test('isMysticSigil', () => {
  assertEquals(isMysticSigil('user@example.com'), true);
  assertEquals(isMysticSigil('invalid-email'), false);
  assertEquals(isMysticSigil('user@example'), false);
});

Deno.test('divineWardStrength', () => {
  assertEquals(divineWardStrength('123456Seven'), 'feeble');
  assertEquals(divineWardStrength('password123'), 'feeble');
  assertEquals(divineWardStrength('MyStrongP@ssword123!'), 'potent');
  assertEquals(divineWardStrength('hJ8$k2#pQ9&mF5@xL7'), 'arcane');
});
