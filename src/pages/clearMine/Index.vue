<script setup lang="ts">
import { reactive, ref } from "vue";
interface Block {
  x: number;
  y: number;
  num: number;
  isOpen: boolean;
  isMine: boolean;
  isSign: boolean;
  textColor?: string;
}
interface GameState {
  isCreateMines: boolean;
  state: "waiting" | "playing" | "won" | "lost";
  board: Block[][];
}
const WIDTH = 10;
const HEIGHT = 10;
const MINENUM = 5;
let gameState = ref<GameState>({
  isCreateMines: false,
  state: "waiting",
  board: [],
});
const numberColors = [
  "#666",
  "#FFC300",
  "#FF5733",
  "#C70039",
  "#900C3F",
  "#581845",
  "#006266",
  "#13025d",
  "#273746",
];
createBoard(WIDTH, HEIGHT);
// 生成棋盘
function createBoard(rows: number, cols: number) {
  let newBoard = Array.from({ length: rows }, (_, y) =>
    Array.from({ length: cols }, (_, x): Block => {
      return { x, y, num: 0, isOpen: false, isMine: false, isSign: false };
    })
  );
  gameState.value.board = newBoard;
  gameState.value.state = "playing";
  gameState.value.isCreateMines = false;
}
// 生成雷区
function randomRange(min: number, max: number) {
  return Math.random() * (max - min) + min;
}
function randomInt(min: number, max: number) {
  return Math.round(randomRange(min, max));
}
function createMine(state: Block[][], initial: Block) {
  const placeRandom = () => {
    const x = randomInt(0, WIDTH - 1);
    const y = randomInt(0, HEIGHT - 1);
    const block = state[y][x];
    if (
      Math.abs(initial.x - block.x) <= 1 &&
      Math.abs(initial.y - block.y) <= 1
    )
      return false;
    if (block.isMine) return false;
    block.isMine = true;
    return true;
  };
  Array.from({ length: MINENUM }, () => null).forEach(() => {
    let placed = false;
    while (!placed) placed = placeRandom();
  });
  queryNumbers();
}

// 计算每个各自周围雷的数量
function queryNumbers() {
  const directions = [
    [1, 1],
    [1, 0],
    [0, 1],
    [1, -1],
    [-1, -1],
    [-1, 1],
    [-1, 0],
    [0, -1],
  ];
  gameState.value.board.forEach((row) => {
    row.forEach((block: Block) => {
      if (!block.isMine) {
        directions.forEach((dir) => {
          let x = block.x + dir[0];
          let y = block.y + dir[1];
          if (
            gameState.value.board[y] &&
            gameState.value.board[y][x] &&
            gameState.value.board[y][x].isMine
          ) {
            block.num++;
          }
        });
        block.textColor = numberColors[block.num];
      }
    });
  });
}
// 翻开
function openBlock(block: Block) {
  if (gameState.value.state !== "playing") {
    return;
  }
  block.isOpen = true;
  if (!gameState.value.isCreateMines) {
    createMine(gameState.value.board, block);
    gameState.value.isCreateMines = true;
  } else {
    checkGame();
  }
  if (block.num === 0) {
    autoOpen(block);
  }
}
// 自动翻开附近为零的格子
function autoOpen(block: Block) {
  const directions = [
    [1, 0],
    [0, 1],
    [-1, 0],
    [0, -1],
  ];
  directions.forEach((dir) => {
    let x = block.x + dir[0];
    let y = block.y + dir[1];
    if (
      gameState.value.board[y] &&
      gameState.value.board[y][x] &&
      !gameState.value.board[y][x].isMine &&
      !gameState.value.board[y][x].isOpen
    ) {
      if (gameState.value.board[y][x].num === 0) {
        gameState.value.board[y][x].isOpen = true;
        autoOpen(gameState.value.board[y][x]);
      }
    }
  });
}
// 右键标记
function rightClick(block: Block) {
  if (gameState.value.state !== "playing") {
    return;
  }
  block.isSign = !block.isSign;
}
// 重新开始
function restart() {
  createBoard(WIDTH, HEIGHT);
}
// 检查是否胜利
function checkGame() {
  const blocks = gameState.value.board.flat();
  if (!blocks.some((block) => !block.isMine && !block.isOpen)) {
    gameState.value.state = "won";
    setTimeout(() => {
      alert("YOU WIN!");
    }, 0);
  } else if (blocks.some((block) => block.isMine && block.isOpen)) {
    gameState.value.state = "lost";
    setTimeout(() => {
      alert("YOU LOST!");
    }, 0);
  }
}
</script>
<template>
  <div class="board center">
    <div class="btns">
      <el-button type="primary" @click="restart" size="small"
        >重新开始</el-button
      >
    </div>
    <div class="blocks">
      <div class="row" v-for="(rows, index) in gameState.board" :key="index">
        <div
          class="block"
          v-for="(row, i) in rows"
          :key="i"
          :class="[
            {
              isOpen: row.isOpen,
              isMine:
                (row.isOpen && row.isMine) ||
                (row.isMine && gameState.state === 'lost'),
            },
          ]"
          @click="openBlock(row)"
          @contextmenu.prevent="rightClick(row)"
        >
          <span v-if="row.isMine && gameState.state === 'lost'">
            <el-icon><Cpu /></el-icon>
          </span>
          <template v-else-if="row.isOpen">
            <template v-if="row.isMine">
              <el-icon><Cpu /></el-icon>
            </template>
            <span v-else :style="{ color: row.textColor }">{{
              row.num || ""
            }}</span>
          </template>
          <span class="flag" v-else-if="row.isSign">
            <el-icon><Flag /></el-icon>
          </span>
        </div>
      </div>
    </div>
  </div>
</template>
<style lang="less" scoped>
.board {
  display: flex;
  flex-direction: column;
  align-items: center;
  .btns {
    margin-bottom: 10px;
  }
  .blocks {
    width: 100%;
    display: flex;
    justify-content: center;
    .row {
      .block {
        width: 40px;
        height: 40px;
        line-height: 40px;
        text-align: center;
        background: #ccc;
        color: #8d8d8d;
        border: 0.5px solid rgba(0, 0, 0, 0.15);
        cursor: pointer;
        user-select: none;
        font-weight: bold;
        font-size: 20px;
        &.isOpen {
          background: #fff;
        }
        &.isMine {
          background: rgb(254, 64, 64);
          color: #fff;
          line-height: 45px;
        }
        .flag {
          color: red;
        }
      }
    }
  }
}
</style>
