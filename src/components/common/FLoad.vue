/*
 * @Author: hzq
 * @Date: 2018-08-07 09:23:43
 * @Last Modified by: hzq
 * @Last Modified time: 2018-08-30 18:45:13
 * @文件说明:全局加载组件
 * @使用方式：this.$loading({isLoading: false})
 */
<template>
    <div class="f-load">
        <loading :show="loading" text="加载中"></loading>
    </div>
</template>

<script>
    import { Loading, TransferDomDirective as TransferDom } from 'vux';
    export default {
        name: 'f-load',
        directives: { TransferDom },
        components: { Loading },
        computed: {
            loading() {
                return this.$store.state.loading;
            }
        }
    };
</script>

<style lang="less" scoped>
    .f-load {
        & /deep/ .weui-toast {
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
            top: 0;
            bottom: 0;
            margin: auto 0;
            width: 84px;
            height: 84px;
            min-height: 84px;
            .weui-loading {
                width: 28px;
                height: 28px;
                margin: 0;
            }
            .weui-toast__content {
                position: relative;
                top: 7px;
                margin: 0;
                // font-size: @font-size-small;
                font-size: 14px;
            }
        }
    }
</style>
