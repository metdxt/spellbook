import { assertEquals, assertThrows } from 'jsr:@std/assert@1';
import { isConsumedByVoid, summonFromVoid, extractEtherealEssence } from '../voidmancy.ts';

Deno.test('isConsumedByVoid', () => {
  assertEquals(isConsumedByVoid(null), true);
  assertEquals(isConsumedByVoid(undefined), true);
  assertEquals(isConsumedByVoid(0), false);
  assertEquals(isConsumedByVoid(''), false);
  assertEquals(isConsumedByVoid(false), false);
});

Deno.test('summonFromVoid', () => {
  assertThrows(() => summonFromVoid(null));
  assertThrows(() => summonFromVoid(undefined));
  assertEquals(summonFromVoid(0), 0);
  assertEquals(summonFromVoid(''), '');
  assertEquals(summonFromVoid(false), false);
});

Deno.test({ name: 'extractEtherealEssence', permissions: { env: true } }, () => {
  assertThrows(() => extractEtherealEssence('NONE_EXISTANCE'));
  Deno.env.set('EXISTANCE', 'EXIST');
  assertEquals(extractEtherealEssence('EXISTANCE'), 'EXIST');
});
