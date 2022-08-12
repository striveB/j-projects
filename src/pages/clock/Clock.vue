<script lang="ts" setup>
    import { ref, reactive, onUnmounted } from 'vue'
    const hr = ref()
    const mn = ref()
    const sc = ref()

    const hrStyle = reactive({
        transform: ''
    })
    const mnStyle = reactive({
        transform: ''
    })
    const scStyle = reactive({
        transform: ''
    })
    function getTime(){
        var date = new Date();
        var HH = (date.getHours() % 12);
        var MM = date.getMinutes();
        var SS = date.getSeconds();
        hrStyle.transform = "rotate(" + (MM/60 + HH) * 30 + "deg)";
        mnStyle.transform = "rotate(" + (MM * 6) + "deg)";
        scStyle.transform = "rotate(" + (SS * 6) + "deg)";
    }
    getTime()
    let timer = setInterval(getTime, 1000)
    onUnmounted(() => {
        clearInterval(timer)
    })
</script>
<template>
<div class="bg">
    <div class="clock">
        <div class="hour">
            <div class="hr" ref="hr" :style="hrStyle"></div>
        </div>
        <div class="min">
            <div class="mn" ref="mn" :style="mnStyle"></div>
        </div>
        <div class="sec">
            <div class="sc" ref="sc" :style="scStyle"></div>
        </div>
    </div>
</div>
</template>
<style lang="less" scoped>
    .bg {
        display: flex;
        justify-content: center;
        align-items: center;
        min-width: 100%;
        min-height: 100vh;
        background-color: #091921;
        .clock {
            width: 350px;
            height: 350px;
            display: flex;
            justify-content: center;
            align-items: center;
            background-image: url('../../assets/clock.png');
            background-size: cover;
            border-radius: 50%;
            box-shadow: 0 -15px 15px rgba(255, 255, 255, 0.05),
                        inset 0 -15px 15px rgba(255, 255, 255, 0.05),
                        0 15px 15px rgba(0, 0, 0, 0.3),
                        inset 0 15px 15px rgba(0, 0, 0, 0.3);
            &:before {
                content: "";
                width: 15px;
                height: 15px;
                background-color: #fff;
                border-radius: 50%;
                z-index: 9999;
            }
            .hour,.min,.sec {
                position: absolute;
            }

            .hour, .hr {
                width: 160px;
                height: 160px;
                .hr {
                    &:before {
                        content: "";
                        position: absolute;
                        width: 8px;
                        height: 80px;
                        z-index: 10;
                        background-color: #ff105e;
                        border-radius: 6px 6px 0 0;
                    }
                }
            }
            .min, .mn {
                width: 190px;
                height: 190px;
                .mn {
                    &:before {
                        content: "";
                        position: absolute;
                        width: 4px;
                        height: 90px;
                        z-index: 11;
                        background-color: #fff;
                        border-radius: 6px 6px 0 0;
                    }
                }
            }
            .sec, .sc {
                width: 230px;
                height: 230px;
                .sc {
                    &:before {
                        content: "";
                        position: absolute;
                        width: 2px;
                        height: 150px;
                        z-index: 12;
                        background-color: #fff;
                        border-radius: 6px 6px 0 0;
                    }
                }
            }
            .hr,.mn,.sc {
                display: flex;
                justify-content: center;
                position: absolute;
                border-radius: 50%;
            }

        }
    }
</style>