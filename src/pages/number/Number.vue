<script lang="ts" setup>
import { ref, reactive, watch } from "vue";
type NodeNum = {
  num: number;
  pos: number;
};
let numsTop = ref(-28);
let step = -28;
let currentIndex = 1;
let nums = reactive<number[]>([8, 9, 10]);
let currentNum = ref(nums[currentIndex]);
// function jia() {
//   currentIndex++;
//   currentNum.value = nums[currentIndex];
//   numsTop.value = currentIndex * step;
//   // console.log(currentIndex, step, numsTop.value);

//   checkNum();
// }
// function jian() {
//   // numsTop.value -= -28;
//   currentIndex--;
//   currentNum.value = nums[currentIndex];
//   numsTop.value -= step - step;
//   checkNum();
// }
// function checkNum() {
//   let min = nums[0];
//   let max = nums.slice(-1)[0];

//   // console.log(currentNum.value, min, max);
//   if (currentNum.value === min) {
//     nums.unshift(min - 1);
//   } else if (currentNum.value === max) {
//     nums.push(max + 1);
//   }
//   currentIndex = nums.findIndex((num) => num === currentNum.value);
// }
// watch(currentNum, () => {}, {
//   immediate: true,
//   deep: true,
// });
</script>
<template>
  <div class="button-number">
    <div class="black" @click="jian">-</div>
    <div class="black center">
      <div class="hide-el">
        <span class="hide">{{ currentNum }}</span>
        <div class="nums" :style="{ top: numsTop + 'px' }">
          <div class="num" v-for="num in nums" :key="num">{{ num }}</div>
        </div>
      </div>
    </div>
    <div class="black" @click="jia">+</div>
  </div>
</template>
<style lang="less" scoped>
.button-number {
  display: flex;
  height: 100vh;
  justify-content: center;
  align-items: center;
  background-color: #091921;
  .black {
    cursor: pointer;
    transition: all 0.3s;
    padding: 10px 20px;
    display: inline-flex;
    border-radius: 5px;
    background: rgba(255, 255, 255, 0.2);
    backdrop-filter: blur(4px);
    font-weight: bold;
    font-size: 20px;
    color: #fff;
    user-select: none;
    -webkit-backdrop-filter: blur(4px);
    &:hover {
      background: rgba(255, 255, 255, 0.3);
    }
    &:nth-child(2) {
      margin: 0 10px;
    }
    &.center {
      display: flex;
      justify-content: center;
      .hide-el {
        position: relative;
        overflow: hidden;
        .hide {
          opacity: 0;
        }
        .nums {
          transition: all 0.3s;
          position: absolute;
        }
      }
    }
  }
}
</style>
