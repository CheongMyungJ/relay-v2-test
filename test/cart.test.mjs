import { test } from 'node:test';
import assert from 'node:assert/strict';
import { formatWon, total } from '../src/cart.mjs';

test('빈 장바구니는 0원', () => {
  assert.equal(total([]), 0);
});

test('가격 × 수량을 더한다', () => {
  assert.equal(total([{ price: 1000, qty: 2 }, { price: 500, qty: 1 }]), 2500);
});

test('할인율을 적용하고 원 아래는 버린다', () => {
  assert.equal(total([{ price: 999, qty: 1 }], { percent: 10 }), 899);
});

test('할인율이 0~100을 벗어나면 오류', () => {
  assert.throws(() => total([], { percent: 120 }), RangeError);
  assert.throws(() => total([], { percent: -1 }), RangeError);
});

test('천 단위 쉼표와 원', () => {
  assert.equal(formatWon(0), '0원');
  assert.equal(formatWon(1234567), '1,234,567원');
  assert.equal(formatWon(-1234), '-1,234원');
});
