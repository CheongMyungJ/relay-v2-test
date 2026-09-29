/**
 * 수량의 합. 수량이 음수인 항목은 0으로 센다 (relay M11 시험).
 * @param {{ qty: number }[]} items
 * @returns {number}
 */
export function totalQty(items) {
  return items.reduce((sum, item) => sum + item.qty, 0);
}
