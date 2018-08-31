/*
 * @Author: hzq
 * @Date: 2018-07-24 15:22:44
 * @Last Modified by: TANGIMING
 * @Last Modified time: 2018-08-23 18:43:55
 * @说明: 上拉加载、下拉刷新组件,现用于客户列表、订单列表、客户经理列表
 * @使用说明: 以下为使用方法
 <f-upload :querys="querys" apiUrl="clientList" @returnData="returnData">
    //以下代码为你的列表html
   <ul>
       <li>你的列表数据</li>
   </ul>
   //以上代码为你的列表html
 </f-upload>
 */

<template>
    <div class="f-upload">
        <Scroller ref="scroller" lock-x height="-200" use-pullup :pullup-config="pullUpConfig" @on-pullup-loading="upLoadData">
            <div>
                <slot></slot>
            </div>
        </Scroller>
    </div>
</template>

<script>
    import {Scroller} from 'vux';
    export default {
        name: 'f-upload',
        components: {Scroller},
        props: {
            apiUrl: {
                //数据请求接口地址,必填
                type: String,
                required: true
            },
            querys: {
                //数据请求接口参数,选填
                type: Object
            },
            pageSize: {
                // 查询数量,选填
                type: Number,
                default: 10
            },
            lastId: {
                // 列表最后一个数据的id,用于上拉加载查询,必填
                required: true,
                default: '001'
            },
            disablePullup: {
                // 是否禁用上拉
                default: 1
            },
            loadData: {
                // 是否在加载数据
                type: Boolean,
                default: false
            }
        },
        data() {
            return {
                //上拉加载 组件参数
                pullUpConfig: {
                    height: 50,
                    downContent: '释放加载',
                    upContent: '上拉加载',
                    loadingContent: '正在加载...'
                },
                //是否正在访问接口
                isLoadData: false
            };
        },
        watch: {
            disablePullup(val) {
                if (val.length) {
                    if (val.length % this.pageSize) {
                        this.$refs.scroller.disablePullup();
                    } else {
                        this.$refs.scroller.enablePullup();
                    }
                } else {
                    this.$refs.scroller.disablePullup();
                }
            },
            loadData(val) {
                if (val) {
                    this.$refs.scroller.reset({top: 0});
                }
            }
        },

        methods: {
            //上拉加载数据
            upLoadData() {
                // 1.判断是否已经在加载数据了
                if (this.isLoadData) return;
                this.isLoadData = true;
                // 2.收集【上拉刷新】操作所需的参数
                let obj = {
                    ...this.querys,
                    orderId: this.lastId
                };
                // 3.访问接口
                this.$api[this.apiUrl](obj).then(res => {
                    // if (res.body.length !== this.pageSize) {
                    //     // 禁用上拉
                    //     this.$refs.scroller.disablePullup();
                    // }
                    // 将列表数据返回给父组件
                    this.$emit('returnData', res.body);
                    setTimeout(() => {
                        this.$nextTick(() => {
                            this.isLoadData = false;
                            // 下拉加载操作完成
                            this.$refs.scroller.donePullup();
                        });
                    }, 200);
                });
            }
        },
        activated() {
            this.isLoadData = false;
        }
    };
</script>

<style lang="less" scoped>
    .f-upload {
        & /deep/ .xs-plugin-pullup-container {
            line-height: 50px;
        }
    }
</style>
