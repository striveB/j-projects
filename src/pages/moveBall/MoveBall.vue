<script lang="ts" setup>
import { onMounted } from "vue";
import { createRandomNum } from "../../utils/number";
let canvas: HTMLCanvasElement;

let ctx: any;

// 小球数量
const ballNums = 1200;

// 检测鼠标半径
const mouseRaduis = 50;

// 小球最大半径最小半径
const ballMaxRadius = 6;
const ballMinRadius = 2;

// 小球最大可变大的半径
const maxRadius = 50;

const colorArr: string[] = [
  "#ffa822",
  "#8c61ff",
  "#31a951",
  "#ff6150",
  "#52ab6a",
];

// 存储所有小球
const ballArr: Ball[] = [];

let mouse: { x: number; y: number } = {
  x: mouseRaduis * -1,
  y: mouseRaduis * -1,
};

class Ball {
  x: number;
  y: number;
  dx: number;
  dy: number;
  radius: number;
  color: string;
  constructor(
    x: number,
    y: number,
    dx: number,
    dy: number,
    radius: number,
    color: string
  ) {
    this.x = x;
    this.y = y;
    this.dx = dx;
    this.dy = dy;
    this.radius = radius;
    this.color = color;
  }

  darw() {
    //创建弧/曲线（用于创建圆形或部分圆）参数 x,y,半径,起始,绘制长度,是否逆时针
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.radius, 0, 2 * Math.PI, false);
    ctx.fillStyle = this.color;
    ctx.fill();
    ctx.closePath();
  }

  update() {
    if (this.x + this.radius > canvas.width || this.x - this.radius < 0) {
      this.dx = -this.dx;
    }

    if (this.y + this.radius > canvas.height || this.y - this.radius < 0) {
      this.dy = -this.dy;
    }
    this.x += this.dx;
    this.y += this.dy;
    if (
      Math.abs(mouse.x - this.x) <= mouseRaduis &&
      Math.abs(mouse.y - this.y) <= mouseRaduis &&
      this.radius < maxRadius
    ) {
      this.radius++;
    } else if (this.radius > ballMaxRadius && this.radius > ballMinRadius) {
      this.radius--;
    }
    this.darw();
  }
}

// 生成小球对象
function initBall(nums: number) {
  for (let i = 0; i < nums; i++) {
    let radius = createRandomNum(ballMinRadius, ballMaxRadius);
    let x = createRandomNum(radius, canvas.width - radius);
    let y = createRandomNum(radius, canvas.height - radius);
    let dx = createRandomNum(-1, 1);
    let dy = createRandomNum(-1, 1);
    let colorIndex = createRandomNum(0, colorArr.length, true);
    const ball = new Ball(x, y, dx, dy, radius, colorArr[colorIndex]);
    ballArr.push(ball);
  }
}

// 动画
function animate() {
  requestAnimationFrame(animate);
  // 把指定范围内的矩形区域像素清除
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ballArr.forEach((ball) => {
    ball.update();
  });
}

function init() {
  canvas = <HTMLCanvasElement>document.getElementById("canvas")!;
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  ctx = canvas.getContext("2d");
  window.addEventListener("mousemove", (e) => {
    const { x, y } = e;
    mouse.x = x;
    mouse.y = y;
  });

  window.addEventListener("mouseout", (e) => {
    mouse = {
      x: mouseRaduis * -1,
      y: mouseRaduis * -1,
    };
  });

  window.addEventListener("resize", (e) => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  });

  initBall(ballNums);

  animate();
}
onMounted(() => {
  init();
});
</script>
<template>
  <canvas id="canvas"></canvas>
</template>
<style lang="less" scoped></style>
