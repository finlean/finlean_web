<template>
    <div class="f-confirm">
        <Confirm :title='title' :confirm-text='confirmText' @on-confirm='confirmFunc' @on-cancel='cancelFunc' :cancel-text='cancelText' :show-cancel-button='showCancelBtn' v-model="showModal">
            <div class="icon-box" v-if="showIcon">
                <i class="iconfont" :class="iconClass" :style="{color:iconColor}"></i>
            </div>
            <div class="content-box">
                <slot></slot>
            </div>
        </Confirm>
    </div>
</template>
<script>
    import {Confirm} from 'vux';
    export default {
        name: 'f-confirm',
        components: {
            Confirm
        },
        props: {
            /**是否显示图标 */
            showIcon: {
                type: Boolean,
                default: false
            },
            /**图标类名 */
            iconClass: {
                tyoe: String,
                default: 'scene_Staging-shenhezhong'
            },
            /**图标颜色 */
            iconColor: {
                type: String,
                default: '#fff'
            },
            /**标题 */
            title: {
                type: String
            },
            /**是否显示取消按钮 */
            showCancelBtn: {
                type: Boolean,
                default: true
            },
            /**确定按钮的文字 */
            confirmText: {
                type: String,
                default: '确定'
            },
            /**取消按钮的文字 */
            cancelText: {
                type: String,
                default: '取消'
            },
            value: {
                type: Boolean,
                default: false
            }
        },
        watch: {
            value(val) {
                this.showModal = val;
            }
        },
        methods: {
            confirmFunc(val) {
                this.$emit('on-confirm');
                this.$emit('input', false);
            },
            cancelFunc() {
                this.$emit('on-cancel');
                this.$emit('input', false);
            }
        },
        data() {
            return {
                showModal: false
            };
        },
        activated(){
            this.showModal=this.value
        }
    };
</script>
<style lang="less" scoped>
    @import '../../style/mixin';
    .f-confirm {
        position: relative;
        & /deep/ .weui-dialog {
            overflow: inherit;
            .weui-dialog__ft {
                font-size: @font-size-primary;
                .weui-dialog__btn_primary {
                    color: @color-text-three;
                }
                .weui-dialog__btn_default {
                    color: @color-text-second;
                }
            }
        }
        .content-box {
            color: @color-text-second;
            font-size: @font-size-medium;
            margin-top: 12px;
            .flexLayout(center,center,center);
        }
        .icon-box {
            position: absolute;
            top: -20%;
            left: 50%;
            width: 64px;
            height: 64px;
            line-height: 64px;
            border-radius: 50%;
            background-color: @color-text-three;
            text-align: center;
            transform: translateX(-50%);
            i {
                color: #fff;
                font-size: 36px;
            }
        }
    }
</style>
