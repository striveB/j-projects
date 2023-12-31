// 数字连续的最长序列
export function longestConsecutive(nums: Array<number>): number {
    if(nums.length === 0) return 0;
    // 对数组进行从小到大排序
    nums.sort((a: number, b: number) => a - b)
    // 去重
    nums = [...new Set(nums)]
    let len = 1
    let res = []
    nums.forEach((num, index) => {
        if(index > 0){
            if((num - 1) === nums[index - 1]) {
                len += 1
            } else {
                res.push(len)
                len = 1 
            }
        }
    })
    res.push(len)
    return Math.max(...res)
}


// 获取指定范围的随机数
export function createRandomNum(min: number, max: number, isInteger: boolean = false) {
    let range = max - min;
    let rand = Math.random();
    let result = range * rand + min
    if(isInteger){
        return Math.floor(result)
    }
    return result;
}