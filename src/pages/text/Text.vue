<script lang="ts" setup>
    import draggable from "vuedraggable"
    import { reactive, watch } from 'vue'
    let successTests = reactive<String[][]>([])
    let placeArea = reactive<String[]>([])
    let selectGroup = reactive<String[]>(['啊', '吧', '从', '的'])
    function onStart(){
        console.log('执行了')
    }

    function gatherSuccess(arr: String[]){
        successTests.push(JSON.parse(JSON.stringify(arr)))
        arr.length = 0
    }
    watch(placeArea, (val) => {
        if(val.length == 4) {
            gatherSuccess(val)
        }
    })
</script>
<template>
    <div class="text">
        <div class="success-list">
            <el-tag v-for="texts, index in successTests" :key="index" size="large" type="success">{{ texts.join('') }}</el-tag>
        </div>
        <div class="play">
            <draggable class="place-area" 
            :class="{'border': placeArea.length == 0}" 
            animation="300" group="ghost" :list="placeArea" 
            :sort="false" item-key="index">
                <template #item="{element}">
                    <div class="single-text">{{element}}</div>
                </template>
            </draggable>
            <draggable class="texts-area" group="ghost" animation="300" :list="selectGroup" :sort="false" item-key="index">
                <template #item="{element}">
                    <div class="single-text">{{element}}</div>
                </template>
            </draggable>
            <!-- <draggable class="texts-area" v-model="selectGroup" group= "name">
                <transition-group>
                    <div class="single-text" v-for="text,index in selectGroup" :key="index">{{ text }}</div>
                </transition-group>
            </draggable> -->
        </div>
    </div>
</template>
<style lang="less" scoped>
@font-face {
  font-family: mFont;
  src: url('../../assets/Alimama_ShuHeiTi_Bold.ttf');
}
.text {
    height: 100vh;
    font-family:  mFont;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    user-select: none;
    .single-text {
        width: 80px;
        height: 80px;
        font-size: 50px;
        text-align: center;
        line-height: 80px;
        border: 1px solid #ccc;
        border-radius: 5px;
        margin: 5px;
        transition: all 0.3s;
    }
    .success-list {
        position: fixed;
        top: 20px;
        right: 20px;
    }
    .play {
        .place-area {
            width: 100%;
            display: flex;
            justify-content: center;
            margin-bottom: 10px;
            &.border {
                min-height: 90px;
                line-height: 90px;
                padding: 0 30px;
                border: 1px solid #ccc;
                &:before {
                    content: '拖入此处';
                }
            }
        }
        .texts-area {
            max-width: 720px;
            display: flex;
            flex-wrap: wrap;
            .single-text {
                flex-shrink: 0;
                font-size: 42px;
                cursor: pointer;
                &:hover {
                    font-size: 50px;
                    background-color: rgba(0, 0, 0, 0.1)
                }
            }
        }
    }    
}
</style>