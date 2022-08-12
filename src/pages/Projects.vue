<template>
    <div class="header">
        <router-link to="/" custom v-slot="{ navigate }">
            <span @click="navigate" class="back">
               <el-icon><ArrowLeftBold /></el-icon>
            </span>
         </router-link>
    </div>
    <router-view></router-view>
</template>
<style lang="less" scoped>
    .header {
        position: fixed;
        top: 0;
        left: 0;
        z-index: 99999;
        width: 100%;
        padding: 10px;
        color: #000;
        .back {
            cursor: pointer;
            transition: all 0.3s;
            padding: 5px;
            display: inline-flex;
            border-radius: 5px;
            background: rgba( 255, 255, 255, 0.2 );
            backdrop-filter: blur( 4px );
            -webkit-backdrop-filter: blur( 4px );
            &:hover {
                background: rgba( 255, 255, 255, 0.3 );
            }
        }
    }
</style>