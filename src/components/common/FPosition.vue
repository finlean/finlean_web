/*
 * @Author: hzq
 * @Date: 2018-08-08 11:05:56
 * @Last Modified by: zxq
 * @Last Modified time: 2018-08-18 14:00:10
 * @文件说明:字母列表组件
 * @使用方式：<f-position> <div>你的列表代码</div> </f-position>，可参考：views/agent/channelManagement.vue
 */
<template>
    <div class="position-page">
        <!--滚动区域-->
        <div class="position-content" :style="{height: contentHeight}" ref="posContent">
            <!--数据列表-->
            <slot></slot>
            <!--首字母列表-->
            <ul class="letter_ul">
                <li v-for="letter in letterList" :key="letter" v-html="letter" @click="clickLetter(letter)"></li>
            </ul>
        </div>
    </div>
</template>

<script>
    export default {
        name: 'f-position',
        props: {
            height: {
                // 需要减去的高度
                type: Number,
                default: 96
            },
            letterList: {
                // 字母列表数据
                type: Array,
                default() {
                    return [
                        'A',
                        'B',
                        'C',
                        'D',
                        'E',
                        'F',
                        'G',
                        'H',
                        'J',
                        'K',
                        'L',
                        'M',
                        'N',
                        'P',
                        'Q',
                        'R',
                        'S',
                        'T',
                        'W',
                        'X',
                        'Y',
                        'Z'
                    ];
                }
            }
        },
        computed: {
            contentHeight() {
                // 计算列表内容高度
                return document.documentElement.clientHeight - this.height + 'px';
            }
        },
        methods: {
            // 点击一个字母事件
            clickLetter(letter) {
                let dom = document.getElementById('letter_' + letter);
                if (dom) {
                    this.$refs.posContent.scrollTop = dom.offsetTop - this.height;
                } else {
                    // this.$refs.posContent.scrollTop = 0;
                }
            }
        }
    };
</script>


<style lang="less" scoped>
    .position-page {
        .position-content {
            overflow-y: auto;
        }
        .letter_ul {
            position: fixed;
            top: 50%;
            right: 0px;
            width: 30px;
            text-align: center;
            font-size: @font-size-small;
            color: @color-text-three;
            background-color: transparent;
            transform: translate3d(0, -50%, 0);
            z-index: 999;
            line-height: 1.5;
        }
    }
</style>
