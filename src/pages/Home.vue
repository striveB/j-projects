<template>
   <div class="body">
      <div class="projects">
         <router-link to="/projects/five-chess" custom v-slot="{ navigate }">
            <div @click="navigate" class="item">
               <span class="title"><el-icon><Aim /></el-icon>&nbsp;五子棋</span>
            </div>
         </router-link>
         <router-link to="/projects/colors" custom v-slot="{ navigate }">
            <div @click="navigate" class="item">
               <span class="title"><el-icon><Brush /></el-icon>&nbsp;颜色追踪</span>
            </div>
         </router-link>
         <router-link to="/projects/clock" custom v-slot="{ navigate }">
            <div @click="navigate" class="item">
               <span class="title"><el-icon><Clock /></el-icon>&nbsp;炫酷时钟</span>
            </div>
         </router-link>
         <router-link to="/projects/text" custom v-slot="{ navigate }">
            <div @click="navigate" class="item">
               <span class="title"><el-icon><WindPower /></el-icon>&nbsp;文字游戏</span>
            </div>   
         </router-link>
         <router-link to="/projects/buttons" custom v-slot="{ navigate }">
            <div @click="navigate" class="item">
               <span class="title"><el-icon><WindPower /></el-icon>&nbsp;按钮</span>
            </div>   
         </router-link>
      </div>
   </div>
</template>
<style lang="less" scoped>
.body {
   width: 100wh;
   height: 100vh;
   display: flex;
   justify-content: center;
   align-items: center;
   text-shadow: 0 0 2px #4d4d4d;
   .projects {
      .item {
         cursor: pointer;
         margin-bottom: 2px;
         transition: 0.3s ease;
         border-radius: 5px;
         padding: 10px;
         &:hover {
            background-color: rgba(0, 0, 0, 0.1);
         }
         .title {
            display: flex;
            align-items: center;
            line-height: 30px
         }
      }
   }
}
</style>