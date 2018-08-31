/*
 * @Author: hzq
 * @Date: 2018-08-08 10:08:52
 * @Last Modified by: hzq
 * @Last Modified time: 2018-08-23 09:38:25
 * @文件说明: 底部tabbar选项组件
 * @使用方式：<f-footer index="2"></f-footer>
 */
<template>
    <tabbar class="tabbar">
        <tabbar-item v-for="(i,index) in footerMenu" :key="index" :selected="index===currIndex" @on-item-click="$router.push(i.router)">
            <i slot="icon" class="iconfont" :class="i.icon"></i>
            <span slot="label">{{i.label}}</span>
        </tabbar-item>
    </tabbar>
</template>

<script>
    import {Tabbar, TabbarItem} from 'vux';

    export default {
        name: 'f-footer',
        components: {Tabbar, TabbarItem},
        data() {
            return {
                footerMenu: []
            };
        },
        computed: {
            currIndex() {
                return this.footerMenu.findIndex(val => {
                    return val.router === this.$route.path;
                });
            }
        },
        created() {
            this.footerMenu = this.$getItem('footerMenu');
        }
    };
</script>

<style lang="less" scoped>
    .tabbar {
        position: fixed;
        height: 49px;
        z-index: 499;
        &::before {
            border-top-color: @color-line !important;
        }
        & /deep/ .weui-tabbar__icon {
            height: 24px;
            .iconfont {
                font-size: @font-size-primary;
            }
        }
    }
</style>
