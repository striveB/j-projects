<script lang="ts" setup>
import { defineProps } from "vue";
const { type } = defineProps(["type"]);
const size = 30;
</script>
<template>
  <el-icon v-if="type === 'IceTea'" color="#00caad" :size="size"
    ><IceTea
  /></el-icon>
  <el-icon v-if="type === 'Orange'" color="Orange" :size="size"
    ><Orange
  /></el-icon>
  <el-icon v-if="type === 'Cherry'" color="#c40000" :size="size"
    ><Cherry
  /></el-icon>
  <el-icon v-if="type === 'ColdDrink'" color="#00a7a7" :size="size"
    ><ColdDrink
  /></el-icon>
  <el-icon v-if="type === 'Coffee'" color="#0096e0" :size="size"
    ><Coffee
  /></el-icon>
  <el-icon v-if="type === 'Pear'" color="#cccc00" :size="size"
    ><Pear
  /></el-icon>
  <el-icon v-if="type === 'Grape'" color="#8604ff" :size="size"
    ><Grape
  /></el-icon>
  <el-icon v-if="type === 'MilkTea'" color="#e44e4e" :size="size"
    ><MilkTea
  /></el-icon>
  <el-icon v-if="type === 'Smoking'" color="#f58765" :size="size"
    ><Smoking
  /></el-icon>
  <el-icon v-if="type === 'Soccer'" color="#d43b0b" :size="size"
    ><Soccer
  /></el-icon>
</template>
<style lang="less" scoped></style>
