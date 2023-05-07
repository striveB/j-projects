<script lang="ts" setup>
import { onMounted } from "vue";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
onMounted(() => {
  // 注册 ScrollTrigger 插件
  gsap.registerPlugin(ScrollTrigger);
  // 创建一个时间轴对象
  const tl = gsap.timeline();
  // 添加动画到时间轴对象
  tl.from(".section1 h1", { opacity: 0, y: -50, duration: 1 }, ">");
  tl.from(".section1 p", { opacity: 0, y: 50, duration: 1 }, "-=1");
  tl.from(".section2 h1", { opacity: 0, y: -50, duration: 1 }, "-=0.5");
  tl.from(".section2 p", { opacity: 0, y: 50, duration: 1 }, "-=1");
  tl.from(".section3 h1", { opacity: 0, y: -50, duration: 1 }, "-=0.5");
  tl.from(".section3 p", { opacity: 0, y: 50, duration: 1 }, "-=1");
  // 配置 ScrollTrigger 触发器
  ScrollTrigger.create({
    animation: tl, // 绑定时间轴对象
    trigger: ".section1", // 触发器元素
    start: "top top", // 触发器开始位置
    end: "+=100%", // 触发器结束位置
    pin: true, // 触发器固定位置
    scrub: true, // 滚动时实时更新动画
    markers: true, // 调试用，显示触发器位置
  });
});
</script>
<template>
  <div class="section section1">
    <h1>Section 1</h1>
    <p>Scroll down to see the animation.</p>
  </div>
  <div class="section section2">
    <h1>Section 2</h1>
    <p>This is the second section.</p>
  </div>
  <div class="section section3">
    <h1>Section 3</h1>
    <p>This is the third section.</p>
  </div>
</template>
<style lang="less" scoped>
.section {
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
.section1 {
  background-color: #5a5a5a;
  color: #fff;
}
.section2 {
  background-color: #8e44ad;
  color: #fff;
}
.section3 {
  background-color: #3498db;
  color: #fff;
}
</style>
