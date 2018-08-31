/*
 * @Author: hzq
 * @Date: 2018-08-08 15:12:59
 * @Last Modified by: hzq
 * @Last Modified time: 2018-08-10 16:13:12
 * @文件说明:圆角搜索输入框组件--实时搜索0.2s延迟 回调函数：on-value，返回输入框的值
 * @使用方式： <f-search placeholder="渠道名称/负责人姓名/负责人电话" @on-value="onValue"></f-search>，可参考：views/agent/channelManagement.vue
 */
<template>
    <div class="f-search">
        <group>
            <x-input ref="inputDom" :placeholder="placeholder" :debounce="200" @on-change="inputChange">
                <i slot="label" class="iconfont scene_Staging-normal"></i>
            </x-input>
        </group>
    </div>
</template>

<script>
    export default {
        name: 'f-search',
        props: {
            placeholder: {
                //暗提示文字
                type: String,
                default: '请输入'
            }
        },
        methods: {
            inputChange(value) {
                this.$emit('on-value', value.trim());
            }
        },
        deactivated() {
            this.$refs.inputDom.reset();
        }
    };
</script>

<style lang="less" scoped>
    .f-search {
        & /deep/ .weui-cells {
            height: 32px;
            margin: 10px 12px;
            border-radius: 50px;
            &::after,&::before {
                display: none;
            }
            .weui-cell {
                height: 32px;
                padding: 5px 15px;
                &::after {
                    display: none;
                }
                .scene_Staging-normal {
                    margin-right: 10px;
                    color: @color-text-placeholder;
                }
            }

        }
    }
</style>
