<template>
    <div class="f-block">
        <p class="block-title vux-1px-b">{{ title }}</p>
        <div class="block-content">
            <slot></slot>
        </div>
    </div>
</template>

<script>
    /**
     * Created by TANGiMING
     * 2018-8-7
     * 一个功能块，可以设置标题，内容自定义
     * @prop        title       定义功能块的标题
     * @slot        定义功能块内容
     */
    export default {
        name: 'f-block',
        props: {
            title: {
                type: String,
                required: true,
                default: '功能块'
            }
        }
    };
</script>
<style lang="less" scoped>
    .f-block {
        margin-top: 10px;
        background-color: #fff;
        .block-title {
            height: 44px;
            line-height: 44px;
            font-size: 15px;
            padding-left: 20px;
            color: #3a3a3a;
        }
    }
</style>
