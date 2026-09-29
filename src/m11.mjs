/**
 * 수량의 합. 수량이 음수인 항목은 0으로 센다 (relay M11 시험).
 * @param {{ qty: number }[]} items
 * @returns {number}
 * @example totalQty([{ qty: 2 }, { qty: -1 }, { qty: 3 }]); // 5
 */
export function totalQty(items) {
  return items.reduce((sum, item) => sum + Math.max(item.qty, 0), 0);
}
