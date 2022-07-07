import { expect, test } from 'vitest'
import { longestConsecutive } from './number'
test('数字连续的最长序列', () => {
    expect(longestConsecutive([1,2,6,7,3])).toBe(3)
})