<script setup lang="ts"></script>
<template>
  <router-link :to="'/projects/clearMine'" custom v-slot="{ navigate }">
    <div @click="navigate" class="item">
      <span class="title" text-red>
        <!-- <el-icon>
          <component :is="page.meta?.icon"></component>
        </el-icon> -->
        扫雷
      </span>
    </div>
  </router-link>
</template>
<style lang="less" scoped></style>
