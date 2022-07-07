<script lang="ts" setup>
import { reactive, ref } from 'vue'
import { longestConsecutive } from '../../utils/number'
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
}
init()
// 下棋操作
function doClick(chess: pieces){
    if(chess.player){
        return
    }
    chess.player = player.value
    if(player.value === 1) {
        balckChess.push(chess)
    } else {
        whiteChess.push(chess)
    }
    if(xyJudge('x') || xyJudge('y')){
        alert(`【${player.value === 1 ? '黑方' : '白方'}】胜利！`)
    }
    player.value = player.value === 1 ? 2 : 1
}

// 判断竖向是否胜利
function xyJudge(axle: 'x' | 'y') {
    let xList: rel = {}
    const chess = player.value === 1 ? balckChess : whiteChess
    chess.forEach(ch => {
        if(!xList[ch[axle]]) {
            xList[ch[axle]] = []
        }
        xList[ch[axle]].push(ch)
    })
    // 所有存在棋子的x轴
    const xKeys = Object.keys(xList) as any as number[]
    // 遍历x轴的棋子
    for(let i = 0; i < xKeys.length; i++) {
        let chessList = xList[xKeys[i]].map(ch => ch[axle === 'y' ? 'x' : 'y'])
        if(longestConsecutive(chessList) >= 5){
            return true;
        }
    }
    return false;
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
                  ></td>
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