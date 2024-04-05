import { expect, it, describe } from 'vitest'

function sum(a, b) {
  return a + b
}

function timeout() {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(4);
    })
  })
}

describe('test sum', () => {
  it('work', () => {
    expect(sum(1, 2)).toBe(3);
    expect(sum(1, 2)).not.toBe(4);
  })

  it('async', async () => {
    const data = await timeout();
    expect(data).toBe(4);
  })
})
