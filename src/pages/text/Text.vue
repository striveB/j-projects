<script lang="ts" setup>
    import draggable from "vuedraggable"
    import { sort } from '../../utils/utils'
    import { reactive, watch } from 'vue'
    let texts = [
        '知男而退', '强人所男', 
        '迎男而上', '左右为男', 
        '男上加男', '患男与共', 
        '暗箭男防', '大男临头', 
        '进退两男', '驷马男追', 
        '寸步男行', '全是男人']

    let successTests = reactive<String[][]>([])
    let placeArea = reactive<String[]>([])
    let selectGroup = reactive<String[]>([])

    init()
    function init() {
        texts = sort(texts)
        let arrText: string[] = []
        texts.slice(0, 8).forEach(text => {
            let temp = text.split('')
            temp.forEach(t => {
                arrText.push(t)
            })
        })
        arrText = sort(arrText)
        arrText.forEach(t => {
            selectGroup.push(t)
        })
    }
    
    function reset(){
        successTests.length = 0
        placeArea.length = 0
        selectGroup.length = 0
        init()
    }

    function checkSuccess(arr: String[]){
        if(texts.includes(arr.join(''))) return true
        return false
    }
    function gatherSuccess(arr: String[]){
        successTests.push(JSON.parse(JSON.stringify(arr)))
        arr.length = 0
    }
    watch(placeArea, (val) => {
        if(checkSuccess(val)) {
            gatherSuccess(val)
        }
    })
</script>
<template>
    <div class="text">
        <div class="success-list">
            <el-tag v-for="texts, index in successTests" :key="index" size="large" type="success">{{ texts.join('') }}</el-tag>
        </div>
        <div class="game-over" v-if="placeArea.length == 0 && selectGroup.length == 0">
            你真棒! &nbsp; <div class="reset" @click="reset"><el-icon><RefreshLeft /></el-icon></div>
        </div>
        <div class="play" v-else>
            <draggable class="place-area" 
            :class="{'border': placeArea.length == 0}" 
            animation="300" group="ghost" :list="placeArea" 
            :sort="true" item-key="index">
                <template #item="{element}">
                    <div class="single-text">{{element}}</div>
                </template>
            </draggable>
            <draggable 
            class="texts-area" 
            :class="{'border': selectGroup.length == 0}" 
            :style="{'justify-content': selectGroup.length == 0 ? 'center' : 'start'}"
            group="ghost" 
            animation="300" 
            :list="selectGroup" 
            :sort="false" item-key="index">
                <template #item="{element}">
                    <div class="single-text">{{element}}</div>
                </template>
            </draggable>
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
    color: #cecece;
    background-color: #091921;
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
        display: flex;
        flex-direction: column;
        /deep/ .el-tag {
            margin-bottom: 10px;
        }
    }
    .game-over {
        display: flex;
        align-items: center;
        font-size: 32px;
        .reset {
            font-size: 25px;
            padding: 2px;
            cursor: pointer;
            transition: all 0.3s;
            display: flex;
            align-items: center;
            &:hover {
                color: rgb(126, 126, 126);
                border-radius: 5px;
                background-color: rgba(0, 0, 0, 0.1);
                .el-icon {
                    transition: all 0.5s;
                    transform: rotate(-360deg);
                }
            }
        }
    }
    .play {
        .border {
            min-height: 90px;
            line-height: 90px;
            padding: 0 20px;
            border: 1px solid #ccc;
            &:before {
                content: '拖入此处';
            }
        }
        .place-area {
            width: 100%;
            display: flex;
            justify-content: center;
            padding: 10px;
            margin-bottom: 10px;
            border-bottom: 1px solid #ccc;
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