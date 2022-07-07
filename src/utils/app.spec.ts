import { expect, test } from 'vitest'
import { longestConsecutive } from './number'
test('测试安装', () => {
    expect(longestConsecutive([1,2,6,7,3])).toBe(3)
})