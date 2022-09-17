<script setup lang="ts">
import BGM from "../../assets/BGM.mp3";
import clear from "../../assets/clear.mp3";
import { ref, reactive, onMounted } from "vue";
import Icons from "./Icons.vue";

let gameOver = ref(false);
const boxWidth = 300;
const boxHeight = 300;
const width = 50;
const height = 50;
const colNum = boxWidth / width;
const rowNum = boxHeight / height;
const icons = [
  "IceTea",
  "Orange",
  "Cherry",
  // "ColdDrink",
  "Coffee",
  "Pear",
  "Grape",
  "MilkTea",
  "Smoking",
  "Soccer",
];
interface Item {
  icon: string;
  i: number;
  isClick: boolean;
  isShow: boolean;
  isLow?: boolean;
  style: {
    zIndex: number;
    top: string;
    left: string;
    bottom?: string;
  };
}

let items = reactive<Item[]>([]);
let cons = reactive<any[]>([]);

init();
function init() {
  gameOver.value = false;
  let zIndex = 0;
  let colI = 0;
  let rowI = 0;
  let cha = 0; //落差
  items.length = 0;
  cons.length = 0;
  for (let i = 1; i < 172; i++) {
    let lColNum = colNum - cha;
    let lRowNum = rowNum - cha;
    let row = Math.floor(rowI / lColNum);
    let item: Item = {
      icon: i + "",
      isClick: false,
      isShow: true,
      i,
      style: {
        zIndex,
        top: row * height + (height / 2) * cha + "px",
        left: colI * width + (height / 2) * cha + "px",
      },
    };
    items.push(item);
    if (row + 1 >= lRowNum && colI + 1 == lColNum) {
      rowI = 0;
      zIndex++;
      cha = Math.floor(Math.random() * 3);
    } else {
      rowI += Math.floor(Math.random() * 1) + 1;
    }
    if (colI + 1 >= lColNum) {
      colI = 0;
    } else {
      colI += Math.floor(Math.random() * 2) + 1;
    }
  }
  setIcons();
  actionCheck();
}
function setIcons() {
  const indexs = Array.from({ length: items.length }, (_, i) => i);
  for (let i = 0; i < items.length / 3; i++) {
    const iconIndex = Math.floor(Math.random() * icons.length);
    const icon = icons[iconIndex];
    let i1 = Math.floor(Math.random() * indexs.length);
    i1 = indexs.splice(i1, 1)[0];
    let i2 = Math.floor(Math.random() * indexs.length);
    i2 = indexs.splice(i2, 1)[0];
    let i3 = Math.floor(Math.random() * indexs.length);
    i3 = indexs.splice(i3, 1)[0];
    items[i1].icon = icon;
    items[i2].icon = icon;
    items[i3].icon = icon;
  }
}
function actionCheck() {
  items.forEach((item) => {
    item.isLow = false;
  });
  items.forEach((item) => {
    checkLow(item);
  });
}
function checkLow(currentItem: Item) {
  const { zIndex, top, left } = currentItem.style;
  let topNum = parseInt(top);
  let leftNum = parseInt(left);
  let tempItems = items.filter((item) => {
    return item.style.zIndex > zIndex;
  });

  tempItems.forEach((item) => {
    let iTop = parseInt(item.style.top);
    let iLeft = parseInt(item.style.left);
    if (item.style.zIndex > zIndex) {
      if (
        // 被完全压住的方块
        (iTop == topNum && iLeft == leftNum) ||
        // 左上被压住的方块
        (iTop == topNum - height / 2 && iLeft == leftNum - width / 2) ||
        // 左下被压住的方块
        (iTop == topNum + height / 2 && iLeft == leftNum - width / 2) ||
        // 右上被压住的方块
        (iTop == topNum - height / 2 && iLeft == leftNum + width / 2) ||
        // 右下被压住的方块
        (iTop == topNum + height / 2 && iLeft == leftNum + width / 2)
      ) {
        currentItem.isLow = true;
      }
    }
  });
}
function removeItem(item: Item) {
  if (item.isLow || item.isClick) {
    return;
  }
  item.isClick = true;
  insertItem(item);
}

function insertItem(item: Item) {
  if (cons.length >= 7) {
    gameOver.value = true;
    return;
  }
  let index = -1;
  let lastIndex = findLastIndex(cons, "icon", item.icon);
  if (lastIndex != -1) {
    index = lastIndex;
    cons.splice(index, 0, item);
  } else {
    cons.push(item);
  }
  checkClear();
}

function findLastIndex(cons: any[], key: string, val: string) {
  let index = -1;
  cons.forEach((item, i) => {
    if (item[key] === val) {
      index = i;
    }
  });
  return index;
}
function checkClear() {
  let num = 1;
  let temp = "";
  for (let i = 0; i < cons.length; i++) {
    const { icon } = cons[i];
    if (icon === temp) {
      num++;
    } else {
      num = 1;
    }
    temp = icon;
    cons[i].style.zIndex = 99;
    cons[i].style.top = "580px";
    cons[i].style.left = i * width + "px";
    if (num === 3) {
      setTimeout(() => {
        cons[i].isShow = false;
        cons[i - 1].isShow = false;
        cons[i - 2].isShow = false;
        cons.splice(i - 2, 3);
        cons.forEach((res, index) => {
          res.style.zIndex = 99;
          res.style.top = "580px";
          res.style.left = index * width + "px";
        });
        clearPlay();
        actionCheck();
      }, 300);
      return;
    }
  }
  if (num != 3) {
    actionCheck();
  }
}
function clearPlay() {
  var audio: any = document.getElementById("clear");
  if (audio !== null) {
    //检测播放是否已暂停.audio.paused 在播放器播放时返回false.
    if (audio.paused) {
      audio.play(); //audio.play();// 这个就是播放
    } else {
      audio.pause(); // 这个就是暂停
    }
  }
}
</script>

<template>
  <audio :src="BGM" autoplay loop></audio>
  <audio id="clear" :src="clear"></audio>
  <div class="gameOver" v-if="gameOver">
    <h1>你输了!</h1>
    <el-button @click="init">重新开始</el-button>
  </div>
  <div class="main">
    <div class="items">
      <div
        class="item"
        v-for="item in items"
        :key="item.i"
        :style="item.style"
        :class="{ low: item.isLow }"
        @click.stop="removeItem(item)"
        v-show="item.isShow"
      >
        <Icons :type="item.icon" />
      </div>
    </div>
    <div class="items container" style="margin-top: 180px">
      <div
        v-for="i in 7"
        :key="i"
        class="bg"
        :style="{ left: (i - 1) * width + 'px' }"
      ></div>
    </div>
    <div class="bottom">
      <el-button @click="init">重新开始</el-button>
    </div>
  </div>
</template>

<style lang="less" scoped>
.gameOver {
  position: fixed;
  width: 100%;
  height: 100vh;
  display: flex;
  line-height: 70px;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  z-index: 999;
  color: #fff;
  background-color: rgba(0, 0, 0, 0.4);
}
.main {
  height: 100vh;
  background-image: url("../../assets/bg.png");
  background-size: cover;
  overflow: hidden;
  .items {
    width: 350px;
    height: 400px;
    margin: 50px auto;
    position: relative;
    &.container {
      .bg {
        position: absolute;
        top: 4px;
        width: 50px;
        height: 50px;
        border-bottom: 3px solid #333;
        &:last-child::before {
          content: "";
          position: absolute;
          width: 3px;
          height: 3px;
          background-color: #333;
          bottom: 0px;
          right: 0;
        }
        &::after {
          content: "";
          position: absolute;
          width: 3px;
          height: 3px;
          background-color: #333;
          bottom: 0px;
        }
      }
    }
    .item {
      position: absolute;
      width: 50px;
      height: 50px;
      display: flex;
      align-items: center;
      justify-content: center;
      text-align: center;
      border-radius: 5px;
      background-color: #f8fed4;
      border: 1.5px solid #333;
      border-bottom: none;
      transition: all 0.3s;
      cursor: pointer;
      user-select: none;
      &.low {
        filter: brightness(50%);
      }
      &::after {
        content: "";
        position: absolute;
        bottom: -1.5px;
        left: -1.5px;
        background-color: green;
        width: 100%;
        height: 5px;
        border-radius: 0 0 3px 3px;
        border: 1.5px solid #333;
        border-top: none;
      }
    }
  }
  .bottom {
    position: fixed;
    bottom: 0;
    left: 0;
    width: 100%;
    display: flex;
    justify-content: center;
    padding-bottom: 20px;
  }
}
</style>
