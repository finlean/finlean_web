<template>
    <div id="app">
        <transition>
            <keep-alive>
                <router-view class="router-view"></router-view>
            </keep-alive>
        </transition>
        <f-load></f-load>
    </div>
</template>

<script>
    import FLoad from './components/common/FLoad';
    export default {
        name: 'App',
        components: { FLoad }
    };
</script>
<style lang="less">
    @import '~vux/src/styles/1px.less';
    @import './style/app.less';
</style>
