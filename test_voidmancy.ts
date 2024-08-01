import { assertEquals, assertThrows } from 'jsr:@std/assert@1';
import { isVoid, nonVoid, nonVoidEnv } from './voidmancy.ts';

Deno.test('isVoid', () => {
  assertEquals(isVoid(null), true);
  assertEquals(isVoid(undefined), true);
  assertEquals(isVoid(0), false);
  assertEquals(isVoid(''), false);
  assertEquals(isVoid(false), false);
});

Deno.test('nonVoid', () => {
  assertThrows(() => nonVoid(null));
  assertThrows(() => nonVoid(undefined));
  assertEquals(nonVoid(0), 0);
  assertEquals(nonVoid(''), '');
  assertEquals(nonVoid(false), false);
});

Deno.test('nonVoidEnv', () => {
  assertThrows(() => nonVoidEnv("NONE_EXISTANCE"));
  Deno.env.set("EXISTANCE", "EXIST");
  assertEquals(nonVoidEnv("EXISTANCE"), "EXIST");
})
