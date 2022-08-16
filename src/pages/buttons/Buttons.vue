<script lang="ts" setup>
import OpenClose from './btns/OpenClose.vue'
</script>

<template>
    <div class="buttons">
        <div class="btns">
            <OpenClose></OpenClose>
        </div>
    </div>
</template>
<style lang="less" scoped>
.buttons {
    height: 100vh;
    display: flex;
    align-items: center;
    background-color: #091921;
    .btns {
        width: 100%;
        display: flex;
        justify-content: center;
        .btn {
            width: 65px;
            height: 65px;
            display: flex;
            justify-content: center;
            align-items: center;
            background-color: #fff;
            border-radius: 6px;
            padding: 5px;
            cursor: pointer;
            transition: all 0.3s;
            &:hover {
            }
        }
    }
}
</style>

