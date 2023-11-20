<script setup lang="ts">
import { reactive, computed, watch } from "vue";
type Tile = {
  id: number,
  x: number;
  y: number;
  value: number;
  hide?: boolean
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
    id: Math.random(),
    x: 2,
    y: 1,
    value: 2,
  },
  {
    id: Math.random(),
    x: 1,
    y: 2,
    value: 2,
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
  return tiles.filter((tile) => tile[direction] === position && !tile.hide);
}
// 根据方向控制棋子位置
function move(keyCode: string) {
  let info = logic[keyCode];
  if(!info) return;
  let isChange = false;
  for (let i = 1; i <= 4; i++) {
    let tiles = getTiles(info.direction, i);
    tiles.sort((a, b) =>  (a[info.moveTo] - b[info.moveTo]) * info.sort);
    let num = info.num;
    tiles.forEach((tile, index) => {
      if(tile[info.moveTo] !== num) {
        isChange = true;
      }
      tile[info.moveTo] = num;
      num += info.sort
      if(index > 0 && tile.value === tiles[index - 1].value && !tile.hide) {
        // setTimeout(() => {
          tiles[index - 1].value += tile.value;
          tiles[index - 1].id = Math.random();
          // 删除当前棋子
          tile.hide = true
          num -= info.sort
        // }, 100)
        isChange = true;
      }
    });
  }
  if(isChange) {
    setTimeout(addTile, 130)
  }
}
// 添加新的棋子
function addTile() {
  for(let i = 4; i > 0; i--) {
    for(let j = 4; j > 0; j--) {
      let tile = tiles.find(tile => tile.x === i && tile.y === j && !tile.hide);
      if(!tile) {
        tiles.push({
          id: Math.random(),
          x: i,
          y: j,
          value: Math.random() > 0.8 ? 2 : 4,
        });
        return;
      }
    }
  }
}
const tilesList = computed(() => {
  return tiles.filter(tile => !tile.hide)
})
</script>
<template>
  <div class="game-2048">
    <div class="game-container">
      <div class="grids">
        <div class="grid" v-for="i in 16">
        </div>
      </div>
      <div class="tiles">
        <Transition name="slide-fade" v-for="tile in tilesList" :key="tile.id">
          <div 
          :class="['tile', 
            `tile-position-${tile.x}-${tile.y}`, 
            `tile-${tile.value}`]"
          >
            {{ tile.value }}
          </div>
        </Transition>
      </div>
    </div>
  </div>
</template>
<style scoped lang="less">
  /*
    进入和离开动画可以使用不同
    持续时间和速度曲线。
  */
  .slide-fade-enter-active {
    transition: all 0.3s ease-out;
  }

  .slide-fade-leave-active {
    transition: all 0.8s cubic-bezier(1, 0.5, 0.8, 1);
  }

  .slide-fade-enter-from,
  .slide-fade-leave-to {
    transform: translateX(20px);
    opacity: 0;
  }

  // .v-enter-from,
  // .v-leave-to {
  //   opacity: 0;
  // }
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