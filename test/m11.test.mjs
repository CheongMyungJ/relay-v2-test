import { test } from 'node:test';
import assert from 'node:assert/strict';
import { totalQty } from '../src/m11.mjs';

test('수량을 더한다', () => {
  assert.equal(totalQty([{ qty: 2 }, { qty: 3 }]), 5);
});

test('수량이 음수인 항목은 0으로 센다', () => {
  assert.equal(totalQty([{ qty: 2 }, { qty: -1 }, { qty: 3 }]), 5);
});
