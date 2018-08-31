/*
 * @Author: hzq
 * @Date: 2018-08-10 16:22:09
 * @Last Modified by: hzq
 * @Last Modified time: 2018-08-10 16:41:27
 * @文件说明:没有数据组件
 * @使用方式：<f-no-data></f-no-data>
 */
<template>
    <div class="f-no-data">
        <img class="img" src="../../assets/imgs/nodata.png" alt="nodata">
        <p class="text">亲，还没相关数据哦</p>
    </div>
</template>

<script>
    export default {
        name: 'f-no-data'
    };
</script>

<style lang='less' scoped>
    .f-no-data {
        margin-top: 80px;
        text-align: center;
        .img {
            width: 91px;
        }
        .text {
            margin-top: 15px;
            font-size: @font-size-medium;
            color: @color-text-placeholder;
        }
    }
</style>
