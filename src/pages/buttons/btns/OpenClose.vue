<script lang="ts" setup>
import { ref } from 'vue'
let isOpen = ref(false)
</script>

<template>
    <div class="btn open-close" @click="isOpen = !isOpen">
        <div class="toggle" :class="{open: isOpen}"></div>
    </div>
</template>
<style lang="less" scoped>
.open-close {
    .toggle {
        width: 100%;
        position: relative;
        margin-top: -4.5px;
        &:before {
            content: "";
            position: absolute;
            width: 100%;
            height: 5px;
            border-radius: 4px;
            background-color: #000;
            transform: translateY(-16px);
            transition: all 0.5s;
        }
        &.open:before {
            transform: translateY(0px);
            transform: rotate(-45deg);
        }
        &:after {
            content: "";
            position: absolute;
            width: 100%;
            height: 5px;
            border-radius: 4px;
            background-color: #000;
            transform: translateY(16px);
            transition: all 0.5s;
            box-shadow: 0 -16px 0px 0px #000;
        }
        &.open:after {
            transform: translateY(0px);
            transform: rotate(45deg);
            box-shadow: 0 0 0px 0px #000;
        }
    }
}
</style>