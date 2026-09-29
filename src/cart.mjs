// 장바구니 합계. relay-v2의 [실제] 시험이 여기에 버그를 심고 relay가 고치게 하는 대상이다.

/**
 * 가격 × 수량의 합에 할인율을 적용한다. 원 아래는 버린다.
 * @param {{ price: number, qty: number }[]} items
 * @param {{ percent?: number }} [coupon]
 * @returns {number}
 */
export function total(items, coupon = {}) {
  const percent = coupon.percent ?? 0;
  if (percent < 0 || percent > 100) throw new RangeError('할인율은 0~100이어야 합니다');
  const subtotal = items.reduce((sum, item) => sum + item.price * item.qty, 0);
  return Math.floor((subtotal * (100 - percent)) / 100);
}

/**
 * 천 단위 쉼표를 넣고 "원"을 붙인다.
 * @param {number} won
 * @returns {string}
 */
export function formatWon(won) {
  return `${String(won).replace(/\B(?=(\d{3})+(?!\d))/g, ',')}원`;
}

/**
 * 장바구니가 비었는가 (S7 기준 브랜치 변경).
 * @param {unknown[]} items
 * @returns {boolean}
 */
export function isEmpty(items) {
  return items.length === 0;
}
