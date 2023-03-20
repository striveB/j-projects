<script lang="ts" setup>
import { reactive } from "vue";
const cars = reactive([
  {
    left: "-100px",
    delay: "-2s",
  },
  {
    left: "200px",
    delay: "0s",
  },
  {
    left: "460px",
    delay: "-1s",
  },
  {
    left: "760px",
    delay: "-1.5s",
  },
  {
    left: "1060px",
    delay: "-2.5s",
  },
  {
    left: "1300px",
    delay: "-3.5s",
  },
]);
</script>
<template>
  <div class="cars-map">
    <div class="road">
      <div
        class="police"
        v-for="car in cars"
        :style="{ left: car.left, 'animation-delay': car.delay }"
      >
        <div class="light_beam"></div>
        <h4>Police</h4>
        <h3>Police</h3>
        <div class="side_mirror"></div>
        <span>
          <b></b>
          <i></i>
        </span>
      </div>
    </div>
  </div>
</template>
<style scoped lang="less">
@keyframes animate_road {
  0% {
    background-position: 50px 0;
  }
  100% {
    background-position: -10px 0;
  }
}
@keyframes animate_deng {
  0% {
    background-color: #29282b;
    box-shadow: 0 -10px #1f5fff, 0 10px #df1b25;
  }
  25% {
    background-color: #29282b;
    box-shadow: 0 -10px #df1b25, 0 10px #1f5fff;
  }
  50% {
    background-color: #1f5fff;
    box-shadow: 0 -10px #df1b25, 0 10px #29282b;
  }
  75% {
    background-color: #df1b25;
    box-shadow: 0 -10px #29282b, 0 10px #1f5fff;
  }
  100% {
    background-color: #df1b25;
    box-shadow: 0 -10px #1f5fff, 0 10px #29282b;
  }
}
@keyframes animation_police_car {
  0% {
    transform: translateX(20px) translateY(-50px);
  }
  25% {
    transform: translateX(-10px) translateY(0px);
  }
  50% {
    transform: translateX(20px) translateY(50px);
  }
  75% {
    transform: translateX(-10px) translateY(0px);
  }
  100% {
    transform: translateX(20px) translateY(-50px);
  }
}
.cars-map {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  background-color: #355463;
  overflow: hidden;
  .road {
    position: relative;
    width: 100vw;
    display: flex;
    justify-content: center;
    align-items: center;
    transform-style: preserve-3d;
    transform: rotate(-15deg);
    &::before {
      content: "";
      position: absolute;
      width: 100%;
      height: 4px;
      background: linear-gradient(
        90deg,
        #fff,
        #fff 50%,
        transparent 50%,
        transparent 100%
      );
      background-size: 50px;
      animation: animate_road 0.125s linear infinite;
    }
    // 警车
    .police {
      position: absolute;
      width: 200px;
      height: 80px;
      background-color: #3f4c54;
      border-radius: 10px;
      box-shadow: -10px 10px rgba(0, 0, 0, 0.05);
      transform-style: preserve-3d;
      perspective: 800px;
      z-index: 10;
      animation: animation_police_car 4s linear infinite;
      // 后车灯
      &::before {
        content: "";
        position: absolute;
        top: 12px;
        left: 2px;
        width: 5px;
        height: 15px;
        border-radius: 2px;
        background-color: #fc3c25;
        box-shadow: 0 42px #fc3c25;
      }
      // 前车灯
      &::after {
        content: "";
        position: absolute;
        top: 10px;
        right: 2px;
        width: 6px;
        height: 15px;
        border-radius: 2px;
        background-color: #fff;
        box-shadow: 0 44px #fff;
      }
      span {
        position: absolute;
        inset: 5px 10px;
        background: #475b66;
        border-radius: 10px;
        overflow: hidden;
        &::before {
          content: "911";
          position: absolute;
          top: 50%;
          left: 48%;
          transform: translate(-50%, -50%) rotate(90deg);
          color: #333;
          font-size: 1.15em;
          font-weight: 1000;
          letter-spacing: 0.1em;
          z-index: 10;
        }
        &::after {
          content: "";
          position: absolute;
          top: 50%;
          left: 60%;
          transform: translate(-50%, -50%);
          z-index: 100;
          width: 6px;
          height: 10px;
          background-color: #29282b;
          transition: all 0.1s;
          box-shadow: 0 -10px #1f5fff, 0 10px #df1b25;
          animation: animate_deng 0.5s linear infinite;
        }
        // 车盖
        b {
          position: absolute;
          inset: 0 30px;
          background-color: #344650;
          border-radius: 10px;
          &::before {
            content: "";
            position: absolute;
            inset: 6px 25px;
            background-color: #ebebeb;
            border-radius: 5px;
          }
          &::after {
            content: "";
            position: absolute;
            inset: 0 58px;
            background: #ebebeb;
          }
        }
        i {
          position: absolute;
          inset: 0;
          &::before {
            content: "";
            position: absolute;
            top: 7px;
            left: 20px;
            width: 40px;
            height: 5px;
            background: #ebebeb;
            transform-origin: right;
            transform: rotate(15deg);
            box-shadow: 100px 34px #ebebeb;
          }
          &::after {
            content: "";
            position: absolute;
            bottom: 7px;
            left: 20px;
            width: 40px;
            height: 5px;
            background: #ebebeb;
            transform-origin: right;
            transform: rotate(-15deg);
            box-shadow: 100px -34px #ebebeb;
          }
        }
      }
      // 灯光
      .light_beam {
        position: absolute;
        top: 5px;
        right: -2px;
        width: 10px;
        height: 70px;
        // background-color: #000;
        border-radius: 15px;
        transform-style: preserve-3d;
        // 左光束
        &::before {
          content: "";
          position: absolute;
          top: 5px;
          left: 0;
          width: 150px;
          height: 16px;
          background: linear-gradient(90deg, #fff6, transparent);
          transform-origin: left;
          transform: perspective(500px) rotateY(-50deg);
        }
        // 右光束
        &::after {
          content: "";
          position: absolute;
          bottom: 5px;
          left: 0;
          width: 150px;
          height: 16px;
          background: linear-gradient(90deg, #fff6, transparent);
          transform-origin: left;
          transform: perspective(500px) rotateY(-50deg);
        }
      }
      h4 {
        position: absolute;
        top: 50%;
        left: -5px;
        color: #fff;
        z-index: 10;
        text-transform: uppercase;
        transform: translateY(-50%) rotate(90deg) scale(0.8);
      }
      h3 {
        position: absolute;
        top: 50%;
        right: -5%;
        color: #fff;
        z-index: 10;
        text-transform: uppercase;
        transform: translateY(-50%) rotate(270deg) scale(0.8);
      }
      .side_mirror {
        position: absolute;
        inset: 0;
        &::before {
          content: "";
          position: absolute;
          top: -8px;
          right: 40px;
          width: 5px;
          height: 10px;
          background-color: #ebebeb;
          border-top-right-radius: 10px;
        }
        &::after {
          content: "";
          position: absolute;
          bottom: -8px;
          right: 40px;
          width: 5px;
          height: 10px;
          background-color: #ebebeb;
          border-bottom-right-radius: 10px;
        }
      }
    }
  }
}
</style>
