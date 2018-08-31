/*
 * @Author: hzq
 * @Date: 2018-08-13 10:22:41
 * @Last Modified by: hzq
 * @Last Modified time: 2018-08-23 09:52:02
 * @文件说明：按钮组件，仅有2种颜色的按钮
 * @使用方式： <f-button @on-click="freeze" type="normal" width="160px">冻结渠道</f-button>  金色按钮
              <f-button @on-click="search">商户查询</f-button>  黑色按钮
 */
<template>
    <div class="f-button-component">
        <button @click="handleButtonClick" class="f-button" :class="buttonClass" :disabled="disabled" :style="{width:width}">
            <slot>{{ text }}</slot>
        </button>
        <slot name="sbIphoneX"></slot>
    </div>
</template>

<script>
    export default {
        name: 'f-button',
        computed: {
            // button的class
            buttonClass() {
                return [
                    {
                        'f-btn-disabled': this.disabled,
                        'f-btn-normal': this.type === 'normal',
                        'f-btn-fixed': this.fixed
                    }
                ];
            }
        },
        methods: {
            // 处理非城市那妞的button的事件
            handleButtonClick() {
                if (this.disabled) {
                    return false;
                }
                this.$emit('on-click');
            }
        },
        props: {
            // type的按钮类型，默认按钮：default(黑色)||normal(金色)
            type: {
                type: String,
                default: 'default'
            },
            // 是否禁用
            disabled: {
                type: Boolean,
                default: false
            },
            // 按钮的文字
            text: {
                type: String
            },
            // 是否固定在底部
            fixed: {
                type: Boolean,
                default: false
            },
            // 按钮宽度，默认宽度为width: 85.3%，在css里面定义的
            width: {
                type: String,
                default: ''
            }
        }
    };
</script>

<style lang="less">
    @media (device-width: 375px) and (device-height: 812px) and (-webkit-min-device-pixel-ratio: 3) {
        //如果以后出现375*812,非ios机型，可以加上下面语句
        .sbIphoneX {
            height: 34px !important;
            background-color: @color-white;
        }
    }
    .f-button-component {
        .f-button {
            display: block;
            width: 85.3%;
            height: 44px;
            margin: 32px auto 0;
            line-height: @font-line-height-base;
            font-size: @font-size-primary;
            color: #fff;
            text-align: center;
            border: none;
            background-color: @color-button-default;
            outline: 0;
            -webkit-appearance: none;
        }

        .f-btn-normal {
            background-color: @color-button-normal;
        }

        .f-btn-fixed {
            position: fixed;
            bottom: 0;
            left: 0;
            width: 100%;
            margin: 0;
        }
    }
</style>
