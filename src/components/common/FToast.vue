/*
 * @Author: hzq
 * @Date: 2018-08-07 09:23:43
 * @Last Modified by: hzq
 * @Last Modified time: 2018-08-13 16:11:17
 * @文件说明:非文字提示组件-成功、失败、网络异常
 * @使用方式：this.$toast({
                            type: 'success||fail||network',
                            text: '冻结成功'
                        });
 */
<template>
    <div class="f-toast">
        <div v-if="toastType">
            <toast :value="true" position="middle" :is-show-mask="true" :time="1000" @on-hide="onHide">
                <div slot="default" class="slot">
                    <i class="iconfont" :class="iconClass"></i>
                    <div>{{toastText}}</div>
                </div>
            </toast>
        </div>
    </div>
</template>

<script>
    import {Toast} from 'vux';
    export default {
        name: 'f-toast',
        components: {Toast},
        computed: {
            iconClass() {
                // 计算iconfont
                if (this.$store.state.toastType === 'success')
                    return 'scene_Staging-chenggong';
                else if (this.$store.state.toastType === 'fail')
                    return 'scene_Staging-shibai';
                else if (this.$store.state.toastType === 'network')
                    return 'scene_Staging-wangluoyichang';
            },
            toastType() {
                return this.$store.state.toastType;
            },
            toastText() {
                return this.$store.state.toastText;
            }
        },
        methods: {
            onHide() {
                this.$toast({type: '', tetx: ''});
            }
        }
    };
</script>

<style lang="less" scoped>
    .f-toast {
        & /deep/ .weui-toast {
            width: 84px;
            height: 84px;
            min-height: 84px;
            .weui-icon_toast {
                display: none;
            }
            .weui-toast__content {
                height: 84px;
                min-height: 84px;
                margin: 0;
                font-size: @font-size-small;
                .slot {
                    display: flex;
                    flex-direction: column;
                    justify-content: center;
                    align-items: center;
                    height: 84px;
                    min-height: 84px;
                    .iconfont {
                        font-size: 28px;
                    }
                }
            }
        }
    }
</style>
