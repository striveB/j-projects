<script setup lang="ts">
import { reactive } from "vue";
type Tile = {
  x: number;
  y: number;
  value: number;
};
type Logic = {
  direction: 'x' | 'y';
  moveTo: 'x' | 'y';
  num: number;
  sort: 1 | -1;
}
// 棋子
let tiles = reactive<Tile[]>([
  {
    x: 2,
    y: 1,
    value: 32,
  },
  {
    x: 2,
    y: 2,
    value: 64,
  },
  {
    x: 4,
    y: 3,
    value: 16,
  },
  {
    x: 2,
    y: 4,
    value: 128,
  },
  {
    x: 3,
    y: 2,
    value: 128,
  },
]);
// 监听四个方向键
window.addEventListener('keydown', (e) => {
  move(e.key)
});
const logic: {
  [key: string]: Logic
} = {
  'ArrowUp': {
    direction: 'x', // 取值方向
    moveTo: 'y', // 移动方向
    num: 1, // 从1开始
    sort: 1, // 1 从小到大，-1 从大到小
  },
  'ArrowDown': {
    direction: 'x',
    moveTo: 'y',
    num: 4,
    sort: -1,
  },
  'ArrowLeft': {
    direction: 'y',
    moveTo: 'x',
    num: 1,
    sort: 1,
  },
  'ArrowRight': {
    direction: 'y',
    moveTo: 'x',
    num: 4,
    sort: -1,
  },
}
// 根据获取指定x或y的棋子（方向，位置）
function getTiles(direction: 'x' | 'y', position: number) {
  return tiles.filter((tile) => tile[direction] === position);
}
// 根据方向控制棋子位置
function move(keyCode: string) {
  let info = logic[keyCode];
  if(!info) return;
  for (let i = 1; i <= 4; i++) {
    let tiles = getTiles(info.direction, i);
    tiles.sort((a, b) =>  (a[info.moveTo] - b[info.moveTo]) * info.sort);
    let num = info.num;
    console.log(tiles);
    tiles.forEach((tile) => {
      tile[info.moveTo] = num;
      num += info.sort
    });
  }
}

</script>
<template>
  <div class="game-2048">
    <div class="game-container">
      <div class="grids">
        <div class="grid" v-for="i in 16">
        </div>
      </div>
      <div class="tiles">
        <div 
        v-for="tile in tiles" 
        :class="['tile', 
          `tile-position-${tile.x}-${tile.y}`, 
          `tile-${tile.value}`]"
        >
          {{ tile.value }}
        </div>
      </div>
    </div>
  </div>
</template>
<style scoped lang="less">
  .game-2048 {
    width: 100%;
    height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;
    .game-container {
      width: 500px;
      height: 500px;
      background-color: #bbada0;
      position: relative;
      border-radius: 5px;
      padding: 10px 15px;
      .grids {
        position: absolute;
        left: 0;
        top: 0;
        width: 100%;
        height: 100%;
        padding: 10px 15px;
        display: flex;
        flex-wrap: wrap;
        z-index: 0;
        justify-content: space-between;
        align-items: center;
        .grid {
          width: 106.25px;
          height: 106.25px;
          background-color: #ccc0b3;
          border-radius: 5px;
          flex-shrink: 0;
        } 
      }
      .tiles {
        position: absolute;
        padding: 6px 0px;
        .tile {
          width: 100px;
          height: 100px;
          border-radius: 5px;
          width: 106.25px;
          height: 106.25px;
          text-align: center;
          line-height: 110px;
          font-weight: bold;
          color: #776e65;
          background: #eee4da;
          position: absolute;
          transition: 100ms ease-in-out;
          transition-property: transform;
          &.tile-2 {
            background: #eee4da;
            font-size: 55px;
          }
          &.tile-4 {
            background: #ede0c8;
            font-size: 55px;
          }
          &.tile-8 {
            background: #f2b179;
            font-size: 55px;
          }
          &.tile-16 {
            background: #f59563;
            font-size: 55px;
          }
          &.tile-32 {
            background: #f67c5f;
            font-size: 55px;
          }
          &.tile-64 {
            background: #f65e3b;
            font-size: 55px;
          }
          &.tile-128 {
            background: #edcf72;
            font-size: 45px;
          }
          &.tile-256 {
            background: #edcc61;
            font-size: 45px;
          }
          &.tile-512 {
            background: #edc850;
            font-size: 45px;
          }
          &.tile-1024 {
            background: #edc53f;
            font-size: 35px;
          }
          &.tile-2048 {
            background: #edc22e;
            font-size: 35px;
          }
          &.tile-position-1-1 {
            transform: translate(0px, 1px);
          }
          &.tile-position-2-1 {
            transform: translate(121px, 1px);
          }
          &.tile-position-3-1 {
            transform: translate(243px, 1px);
          }
          &.tile-position-4-1 {
            transform: translate(364px, 0px);
          }

          &.tile-position-1-2 {
            transform: translate(0px, 121px);
          }
          &.tile-position-2-2 {
            transform: translate(121px, 121px);
          }
          &.tile-position-3-2 {
            transform: translate(243px, 121px);
          }
          &.tile-position-4-2 {
            transform: translate(364px, 121px);
          }

          &.tile-position-1-3 {
            transform: translate(0px, 241px);
          }
          &.tile-position-2-3 {
            transform: translate(121px, 241px);
          }
          &.tile-position-3-3 {
            transform: translate(243px, 241px);
          }
          &.tile-position-4-3 {
            transform: translate(364px, 241px);
          }

          &.tile-position-1-4 {
            transform: translate(0px, 361px);
          }
          &.tile-position-2-4 {
            transform: translate(121px, 361px);
          }
          &.tile-position-3-4 {
            transform: translate(243px, 361px);
          }
          &.tile-position-4-4 {
            transform: translate(364px, 361px);
          }
        }
      }
    }
  }
</style>