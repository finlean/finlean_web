<template>
    <div>
        <div class="f-space-small" v-if="type === 'small'"></div>
        <div class="f-space-large" v-if="type === 'large'"></div>
    </div>
</template>

<script>
    /**
     * Created by c.y on 2018/3/16.
     * 组件的命名 项目名（F---filean) + 组件的描述（区别与框架的组件）
     * 全局板块的区分，以及footer的遮挡空白区域, small代表版块的区分，large代表footer的遮挡空白区域
     */
    export default {
        name: 'fspace',
        props: {
            type: {
                type: String,
                default: 'small'
            }
        }
    };
</script>

<style lang="less">
    .f-space-small {
        width: 100%;
        height: 10px;
        // background-color: @color-background-default;
    }
    .f-space-large {
        width: 100%;
        height: 59px;
        background: transparent;
    }
    @media (device-width: 375px) and (device-height: 812px) and (-webkit-min-device-pixel-ratio: 3) {
        .f-space-large {
            height: 83px;
        }
    }
</style>
