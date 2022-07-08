<script lang="ts" setup>
import { reactive, ref } from 'vue'
type pieces = {
    x: number,
    y: number,
    player?: number
}

type rel = {
    [key: number]: pieces[]
}
// 当前玩家
let player = ref(1)
// 棋盘
let checkerboard = reactive<pieces[][]>([])
// 黑方所有棋子
let balckChess: pieces[] = []
// 白方所有棋子
let whiteChess: pieces[] = []

// 初始化棋盘
function init(){
    checkerboard = Array.from(
        { length: 15 }, 
        (_, y) =>  Array.from(
            { length: 15 }, 
            (_, x) => ({x, y})
        )
    )
    console.log(checkerboard)
}
init()
// 下棋操作
function doClick(chess: pieces){
    console.log(chess)
    if(chess.player){
        return
    }
    chess.player = player.value
    if(player.value === 1) {
        balckChess.push(chess)
    } else {
        whiteChess.push(chess)
    }
    if(
        crosswise(chess.x, chess.y, chess.player) || 
        vertical(chess.x, chess.y, chess.player) || 
        rightIncline(chess.x, chess.y, chess.player) || 
        leftIncline(chess.x, chess.y, chess.player)
    ){
        alert(`【${player.value === 1 ? '黑方' : '白方'}】胜利！`)
    }
    player.value = player.value === 1 ? 2 : 1
}

// 判断横向是否胜利
function crosswise(x: number, y: number, player: number) {
    let len = 1
    let tempX: number = x
    // 向左方查找
    for (let i = 1; i <= 5; i++) {
        tempX -= 1
        if(tempX >= 0 && checkerboard[y][tempX].player === player) {
            len += 1
        } else {
            break
        }
    }
    tempX = x
    // 向右方查找
    for (let i = 1; i <= 5; i++) {
        tempX += 1
        if(tempX <= 14 && checkerboard[y][tempX].player === player) {
            len += 1
        } else {
            break
        }
    }
    return len >= 5
}

// 判断竖向是否胜利
function vertical(x: number, y: number, player: number) {
    let len = 1
    let tempY: number = y
    // 向上方查找
    for (let i = 1; i <= 5; i++) {
        tempY -= 1
        if(tempY >= 0 && checkerboard[tempY][x].player === player) {
            len += 1
        } else {
            break
        }
    }
    tempY = y
    // 向下方查找
    for (let i = 1; i <= 5; i++) {
        tempY += 1
        if(tempY <= 14 && checkerboard[tempY][x].player === player) {
            len += 1
        } else {
            break
        }
    }
    return len >= 5
}

// 判断右斜方是否胜利
function rightIncline(x: number, y: number, player: number) {
    let len = 1
    let tempX: number = x
    let tempY: number = y
    // 左上方查找
    for (let i = 1; i <= 5; i++) {
        tempX -= 1
        tempY -= 1
        if(tempX >= 0 && tempY >= 0 && checkerboard[tempY][tempX].player === player) {
            len += 1
        } else {
            break
        }
    }
    tempX = x
    tempY = y
    // 右下方查找
    for (let i = 1; i <= 5; i++) {
        tempX += 1
        tempY += 1
        if(tempX <= 14 && tempY <= 14 && checkerboard[tempY][tempX].player === player) {
            len += 1
        } else {
            break
        }
    }
    return len >= 5
}

// 判断左斜方是否胜利
function leftIncline(x: number, y: number, player: number){
    let len = 1
    let tempX: number = x
    let tempY: number = y
    // 右上方查找
    for (let i = 1; i <= 5; i++) {
        tempX += 1
        tempY -= 1
        if(tempX <= 14 && tempY >= 0 && checkerboard[tempY][tempX].player === player) {
            len += 1
        } else {
            break
        }
    }
    tempX = x
    tempY = y
    // 左下方查找
    for (let i = 1; i <= 5; i++) {
        tempX -= 1
        tempY += 1
        if(tempX >= 0 && tempY <= 14 && checkerboard[tempY][tempX].player === player) {
            len += 1
        } else {
            break
        }
    }
    return len >= 5
}


</script>

<template>
    <div class="five">
        <div class="container">
            <table class="table">
                <!-- 渲染tr -->
                <tr v-for="arr1, index in checkerboard" :key="index">
                  <!-- 渲染td,绑定点击事件，并把参数传递到事件中 -->
                  <td 
                  v-for="pieces in arr1" 
                  @click="doClick(pieces)" 
                  :class="{'black': pieces.player === 1, 'white': pieces.player === 2}"
                  :key="pieces.x"
                  >
                  <!-- {{ pieces.x }},{{ pieces.y }} -->
                  </td>
                </tr>
            </table>
            <div class="side">
                当前玩家: {{ player === 1 ? '黑方' : '白方' }}
            </div>
        </div>
    </div>
</template>

<style lang="less" scoped>
.five {
    width: 100vw;
    height: 100vh;
    display: flex;
    justify-self: center;
    align-items: center;
    .container {
        margin: 0 auto;
        display: flex;
        .table {
            width: 730px;
            height: 730px;
            background-image: url(../../assets/checkerboard.webp);
            background-size: 106.5% 106.5%;
            background-position: -24px -24px;
            border: 5px solid black;
            td {
                width: 35px;
                height: 35px;
                text-align: center;
                line-height: 35px;
                border-radius: 50%;
                margin-right: 13px;
                margin-bottom: 11px;
                cursor: pointer;
            }
            .black {
                background-color: black;
            }
            .white {
                background-color: white;
            } 
        }
    }   
}
</style>