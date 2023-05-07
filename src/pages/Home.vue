<script lang="ts" setup>
import { routes } from "../router/index";
const pages = routes[1].children;
</script>
<template>
  <div class="body">
    <div class="projects">
      <router-link
        v-for="page in pages"
        :key="page.path"
        :to="'/projects/' + page.path"
        custom
        v-slot="{ navigate }"
      >
        <div @click="navigate" class="item">
          <span class="title"
            ><el-icon>
              <component :is="page.meta?.icon"></component>
            </el-icon>
            &nbsp;{{ page.name }}</span
          >
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
        line-height: 30px;
      }
    }
  }
}
</style>
