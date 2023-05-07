<script setup lang="ts"></script>

<template>
  <div id="page">
    <RouterView />
  </div>
</template>

<style lang="less">
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  list-style: none;
}
#page {
  .center {
    min-height: 100vh;
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
  }
}
</style>
