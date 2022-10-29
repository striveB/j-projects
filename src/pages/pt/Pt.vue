<script lang="ts" setup>
import { reactive, ref, onMounted } from "vue";
import { ElMessage, ElMessageBox } from "element-plus";
import mn from "@/assets/pt/mn.jpg";
import ndz1 from "@/assets/pt/ndz1.jpg";
import xcn from "@/assets/pt/xcn.jpg";
import xm from "@/assets/pt/xm.jpg";
import xg from "@/assets/pt/xg.jpg";
import hs from "@/assets/pt/hs.jpg";
import rcy1 from "@/assets/pt/rcy1.jpg";
import rcy2 from "@/assets/pt/rcy2.jpg";
import swk from "@/assets/pt/swk.jpg";
const in18 = [mn, hs, rcy2];
const images = [
  {
    label: "修猫",
    value: xm,
  },
  {
    label: "修狗",
    value: xg,
  },
  {
    label: "祢豆子",
    value: ndz1,
  },
  {
    label: "孙悟空",
    value: swk,
  },
  {
    label: "小丑女",
    value: xcn,
  },
  {
    label: "二次元",
    value: rcy1,
  },
  {
    label: "二次元 - 禁",
    value: rcy2,
  },
  {
    label: "嘿丝儿 - 禁",
    value: hs,
  },
  {
    label: "? - 禁",
    value: mn,
  },
];
let activeImage = ref(xm);
type BlockStyle = {
  id: string;
  width: string;
  height: string;
  angle: number; //旋转角度
  x: string;
  y: string;
  left: string;
  top: string;
  backgroundPositionX: string;
  backgroundPositionY: string;
  backgroundImage: string; //背景图
};
const area = {
  width: "600px",
  height: "600px",
};
// 多少列
let x = 4;
// 多少行
let y = 4;
let xy = ref(x + "," + y);
// 是否开启旋转
let isRotate = ref(false);
let data = reactive({
  blockStyles: createBlock(x, y),
});
let tempDom: any = null;
let tempBlock: any = null;
let result = ref(false);

function createBlock(num1: number, num2: number): BlockStyle[] {
  let widthSize = parseInt(area.width) / num1;
  let heightSize = parseInt(area.height) / num2;
  const arrs: BlockStyle[][] = Array.from({ length: num2 }, (_, y) =>
    Array.from({ length: num1 }, (_, x) => ({
      id: Math.floor(Math.random() * 1000) + "",
      width: widthSize + "px",
      height: heightSize + "px",
      angle: 0, //旋转角度
      x: x * widthSize + "px",
      y: y * heightSize + "px",
      left: x * widthSize + "px",
      top: y * heightSize + "px",
      backgroundPositionX: x * widthSize * -1 + "px",
      backgroundPositionY: y * heightSize * -1 + "px",
      backgroundImage: `url(${activeImage.value})`, //背景图
    }))
  );
  let tempArr: BlockStyle[] = [];
  arrs.forEach((res) => {
    res.forEach((block) => {
      tempArr.push(block);
    });
  });
  tempArr.sort(() => 0.5 - Math.random());
  let col = 0;
  let row = 0;
  tempArr.forEach((res, index) => {
    if (isRotate.value) {
      res.angle = Math.floor(Math.random() * 4) * 90;
    } else {
      res.angle = 0;
    }
    res.left = widthSize * col + "px";
    res.top = heightSize * row + "px";
    col++;
    if (col === num1) {
      col = 0;
      row++;
    }
  });
  return tempArr;
}

function setAngle(block: BlockStyle) {
  if (!isRotate.value) {
    return;
  }
  block.angle += 90;
  checkGameOver();
}
function setActive(e: any, block: BlockStyle) {
  block.left = tempBlock.left;
  block.top = tempBlock.top;

  tempBlock.left = e.target.style.left;
  tempBlock.top = e.target.style.top;

  checkGameOver();
}
function start(e: any, block: BlockStyle) {
  tempDom = e.target;
  tempBlock = block;
  e.target.style.transform = "rotate(" + block.angle + "deg)";
  e.target.style.opacity = 0.5;
}
function end(e: any) {
  e.target.style.opacity = 1;
}
function over(e: any) {
  e.preventDefault();
}
function checkGameOver() {
  result.value = data.blockStyles.every((block) => {
    return (
      block.left === block.x && block.top === block.y && block.angle % 360 === 0
    );
  });
  if (result.value) {
    ElMessage({
      message: "完成！！",
      type: "success",
    });
  }
}
function imgChange(val: string) {
  if (in18.includes(val)) {
    ElMessageBox.prompt("你怎么回事儿？👮", "输入密码", {
      confirmButtonText: "确认",
      cancelButtonText: "取消",
    }).then(({ value }) => {
      if (value !== "俊哥最帅") {
        ElMessage({
          message: "去玩修猫！！",
          type: "warning",
        });
        activeImage.value = xm;
      } else {
        activeImage.value = val;
      }
      reset();
    });
  } else {
    activeImage.value = val;
    reset();
  }
}
function sizeChange(value: string) {
  let arr = value.split(",");
  x = parseInt(arr[0]);
  y = parseInt(arr[1]);
  if (x === 5) {
    ElMessage({
      message: "怕是有点难哦！😅",
      type: "warning",
    });
  } else if (x === 6) {
    ElMessage({
      message: "这是真的难！😂",
      type: "warning",
    });
  } else if (x === 8) {
    ElMessage({
      message: "6，这都敢选？😳",
      type: "warning",
    });
  }
  reset();
}
function reset() {
  result.value = false;
  data.blockStyles = reactive<BlockStyle[]>(createBlock(x, y));
}
</script>

<template>
  <div class="pt">
    <div class="header" :style="{ width: area.width }">
      <div class="left">
        <img :src="activeImage" />
        <el-select
          :model-value="activeImage"
          placeholder="Select"
          @change="imgChange"
          style="width: 120px"
        >
          <el-option
            v-for="item in images"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          />
        </el-select>
      </div>
      <el-select
        v-model="xy"
        placeholder="Select"
        @change="sizeChange"
        style="width: 120px"
      >
        <el-option label="3x3" value="3,3" />
        <el-option label="4x4" value="4,4" />
        <el-option label="5x5" value="5,5" />
        <el-option label="6x6" value="6,6" />
        <el-option label="8x8" value="8,8" />
      </el-select>
      <div class="right">
        是否旋转：<el-switch v-model="isRotate" @change="reset" />
      </div>
    </div>
    <div class="game-box">
      <div
        class="img-area"
        :style="[
          area,
          {
            backgroundImage: result ? 'url(' + activeImage + ')' : '',
            backgroundSize: area.width + ' ' + area.height,
          },
        ]"
      >
        <template v-if="!result">
          <div
            class="block"
            draggable="true"
            v-for="block in data.blockStyles"
            :key="block.id"
            @dragstart="start($event, block)"
            @dragover="over"
            @dragend="end"
            @drop="setActive($event, block)"
            @click="setAngle(block)"
            :style="[
              block,
              { transform: 'rotate(' + block.angle + 'deg)' },
              { backgroundSize: area.width + ' ' + area.height },
            ]"
          ></div>
        </template>
      </div>
    </div>
  </div>
</template>

<style lang="less" scoped>
.pt {
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  .header {
    margin-bottom: 15px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    .left {
      display: flex;
      align-items: center;
      img {
        margin-right: 10px;
        width: 40px;
        height: 40px;
        border-radius: 5px;
      }
    }
  }
  .game-box {
    display: flex;
    & > div {
      flex-shrink: 0;
    }
    .img-area {
      position: relative;
      .block {
        position: absolute;
        transition: all 0.3s;
        cursor: pointer;
        border: 1.5px solid rgba(0, 128, 208, 0.3);
      }
    }
  }
}
</style>
