// 打乱数组
export function sort(arr: any[]): any[] {
    return arr.sort(() => 0.5 - Math.random())
}