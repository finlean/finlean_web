/*
 * @Author: hzq
 * @Date: 2018-08-06 15:19:07
 * @Last Modified by: hzq
 * @Last Modified time: 2018-08-07 15:29:15
 * @文件说明:页面提示文字
 */
<template>
    <div class="f-tips">
        <slot></slot>
    </div>
</template>

<script>
    export default {
        name: 'f-tips'
    };
</script>

<style lang="less" scoped>
    .f-tips {
        padding: 10px 15px;
        // height: 40px;
        // line-height: 40px;
        color: @color-text-three;
        font-size: @font-size-small;
    }
</style>
