<script lang="ts" setup>
    import { reactive, ref } from 'vue'
    interface Rel {
        [index: number]: {
            backgroundColor: string,
            boxShadow: string,
        }
    }
    const colors = [
        '#f44336',
        '#e91e63',
        '#9c27b0',
        '#673ab7',
        '#3f51b5',
        '#2196f3',
        '#03a9f4',
        '#00bcd4',
        '#009688',
        '#4caf50',
        '#8bc34a',
        '#cddc39',
        '#ffeb3b',
        '#ffc107',
        '#ff9800',
        '#ff5722',
        '#795548',
        '#9e9e9e',
        '#607d8b',
    ];
    let title = reactive([{
        text: '颜',
        color: ''
    },{
        text: '色',
        color: ''
    },{
        text: '追',
        color: ''
    },{
        text: '踪',
        color: ''
    }])
    let rel = reactive<Rel>({})
    let isRemove = ref(true)
    let timer = 0
    function addBg(index: number){
        let color = colors[Math.floor(Math.random() * colors.length)];
        let now = new Date().getTime()
        if(now - timer >= 200) {
            setTitleColor(color)
            timer = now
        }
        rel[index] = {
            backgroundColor: color,
            boxShadow: `0 0 2px ${color}, 0 0 10px ${color}`,
        };
    }
    function removeBg(index: number){
        if(!isRemove.value) return
        rel[index] = {
            backgroundColor: '#313131',
            boxShadow: '0 0 2px #000'
        }
    }
    let i = 0
    function setTitleColor(color: string) {
        title.forEach(item => {
            item.color = '#000'
        })
        if(i >= title.length){
            i = 0;
        }
        title[i].color = color;
        i++;
    }
    function resetTitleColor() {
        title.forEach(item => {
            item.color = colors[Math.floor(Math.random() * colors.length)]
        })
    }
    resetTitleColor()
</script>
<template>
    <div class="colors">
        <h1> 
            <span 
            v-for="t, index in title" 
            :key="index" 
            :style="{color: t.color, textShadow: `0 0 2px ${t.color}, 0 0 3px ${t.color}`}">{{ t.text }}</span>
        </h1>
        <div class="setting">
            <div class="setting-item">
                <span>颜色隐藏:</span> <el-switch v-model="isRemove"/>
            </div>
        </div>
        <div class="box">
            <div
            class="check"
            v-for="i in 1000"
            :key="i"
            :style="rel[i]"
            @mouseover="addBg(i)"
            @mouseout="removeBg(i)"></div>
        </div>
    </div>
</template>
<style lang="less" scoped>
.colors {
    height: 100vh;
    display: flex;
    overflow: hidden;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    background-color: #222222;
    h1 { 
        margin-bottom: 10px;
        span { 
            margin: 0 3px;
            font-size: 36px;
            transition: 0.3s ease;
        }
    }
    .setting {
        .setting-item {
            display: flex;
            align-items: center;
            span {
                margin-right: 10px;
                color: #e0e0e0;
                text-shadow: 0 0 5px #5a5a5a;
            }
        }
    }
    .box {
        display: flex;
        flex-wrap: wrap;
        align-content: flex-start;
        width: 800px;
        .check {
            width: 16px;
            height: 16px;
            margin: 2px;
            cursor: pointer;
            background-color: #313131;
            box-shadow: 0 0 2px #000;
            transition: 2s ease;
            &:hover {
                transition-duration: 0s;
            }
        }
    }
}
</style>