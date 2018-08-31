+/*
 * @Author: hzq
 * @Date: 2018-08-08 15:55:18
 * @Last Modified by: hzq
 * @Last Modified time: 2018-08-08 18:14:51
 * @文件说明:筛选组件 回调函数：on-filter，返回：筛选结果
 * @使用方式：<f-filter :show.sync="showFilter" @on-filter="onFilter"></f-filter>
 */
<template>
    <div class="f-filter" v-if="show" @click.self="hideFilter">
        <div class="filter-warp">
            <div class="filter-title">筛选</div>
            <div class="filter-content">
                <div class="content-item" v-for="i in filterList" :key="i.searchKey">
                    <!-- 其他正常筛选条件 -->
                    <div class="content-title" @click="openLi(i)">
                        <span class="title">{{i.title}}</span>
                        <i class="iconfont scene_Staging-return" :class="i.open?'up':'down'"></i>
                    </div>
                    <ul class="content-list" v-show="i.open">
                        <li class="list-item" :class="{liChoosed:j.choosed}" v-for="j in i.data" :key="j.code" @click="liClick(i,j)">{{j.name}}</li>
                    </ul>
                </div>
                <!-- 日期筛选条件 -->
                <div class="content-item" v-if="calendar">
                    <group class="calandarStyle">
                        <div class="content-title">
                            <span class="title">交易日期</span>
                        </div>
                        <div class="calendarDiv">
                            <calendar title="" v-model="startDay" disable-future @on-change="startDayChange" placeholder="请选择起始日期"></calendar>
                            <span class="line">-</span>
                            <calendar title="" v-model="endDay" disable-future @on-change="endDayChange" placeholder="请选择结束日期"></calendar>
                        </div>
                    </group>
                </div>
                <!-- 金额筛选条件 -->
                <div class="content-item" v-if="amt">
                    <group class="amtStyle">
                        <div class="content-title">
                            <span class="title">交易金额</span>
                        </div>
                        <div class="amtDiv">
                            <x-input placeholder="请输入起始金额" type="tel" :max="6" v-model="startAmt" text-align="center" @on-blur="startAmtBlur"></x-input>
                            <span class="line">-</span>
                            <x-input placeholder="请输入结束金额" type="tel" :max="6" v-model="endAmt" text-align="center" @on-blur="endAmtBlur"></x-input>
                        </div>
                    </group>
                </div>
                <!-- 省市区筛选条件 -->
                <div v-if="showArea">
                    <div class="content-item" v-for="i in areaInfo" :key="i.searchKey">
                        <div class="content-title" @click="openLi(i)">
                            <span class="title">{{i.title}}</span>
                            <i class="iconfont scene_Staging-return" :class="i.open?'up':'down'"></i>
                        </div>
                        <ul class="content-list" v-show="i.open">
                            <li class="list-item" :class="{liChoosed:j.choosed}" v-for="j in i.data" :key="j.code" @click="liClick(i,j)">{{j.name}}</li>
                        </ul>
                    </div>
                </div>

            </div>
            <div class="filter-footer">
                <f-button type="normal" width="100%" @on-click="init('reset')">重置</f-button>
                <f-button width="100%" @on-click="confirm">确定</f-button>
            </div>
        </div>
    </div>
</template>

<script>
    import {Calendar} from 'vux';
    export default {
        name: 'f-filter',
        components: {Calendar},
        props: {
            show: {
                // 是否显示该组件
                type: Boolean,
                default: false
            },
            list: {
                // 筛选数据
                type: Array,
                default() {
                    return [
                        // {
                        //     title: '所属渠道',
                        //     type: [],
                        //     searchKey: 'channel',
                        //     data: [
                        //         {
                        //             name: '七六八八',
                        //             code: '7688'
                        //         }
                        //     ]
                        // },
                        // {
                        //     title: '分期期数',
                        //     type: '',
                        //     searchKey: 'qishu',
                        //     data: [
                        //         {
                        //             name: '3期',
                        //             code: '3'
                        //         }
                        //     ]
                        // }
                    ];
                }
            },
            one: {
                //是否为单选，默认true
                type: Boolean,
                default: true
            },
            calendar: {
                //是否为开启日期选择，默认false
                type: Boolean,
                default: false
            },
            amt: {
                //是否为开启金额选择，默认false
                type: Boolean,
                default: false
            },
            showArea: {
                //是否为开启省市区联查，默认false
                type: Boolean,
                default: false
            }
        },
        data() {
            return {
                // 筛选数据列表
                filterList: null,
                // 筛选结果
                filterResult: {},
                // 开始时间
                startDay: '',
                // 结束时间
                endDay: '',
                // 开始金额
                startAmt: '',
                // 结束金额
                endAmt: '',
                // 是否能点击确认
                canClick: true,
                // 省市区数据
                areaInfo: [
                    {
                        title: '省份',
                        open: false,
                        data: [],
                        searchKey: 'provCode'
                    },
                    {
                        title: '城市',
                        open: false,
                        data: [],
                        searchKey: 'cityCode'
                    },
                    {
                        title: '区县',
                        open: false,
                        data: [],
                        searchKey: 'areaCode'
                    }
                ]
            };
        },
        methods: {
            // 显示、隐藏
            openLi(i) {
                i.open = !i.open;
            },
            // 每一个筛选块的点击事件
            liClick(i, j) {
                if (this.one) {
                    i.data.map(val => {
                        if (val.code === j.code) {
                            j.choosed = !j.choosed;
                        } else {
                            val.choosed = false;
                        }
                    });
                    if (Array.isArray(this.filterResult[i.searchKey])) {
                        this.filterResult[i.searchKey] = j.choosed ? [j.code] : [];
                    } else {
                        this.filterResult[i.searchKey] = j.choosed ? j.code : '';
                    }
                    if (this.showArea) {
                        if (i.searchKey === 'provCode') {
                            let childList = this.$copy(j.childList);
                            childList.map(val => this.$set(val, 'choosed', false));
                            this.areaInfo[1].data = j.choosed ? childList : [];
                            this.areaInfo[2].data = [];
                            this.filterResult.cityCode = '';
                            this.filterResult.areaCode = '';
                        } else if (i.searchKey === 'cityCode') {
                            let childList = this.$copy(j.childList);
                            childList.map(val => this.$set(val, 'choosed', false));
                            this.areaInfo[2].data = j.choosed ? childList : [];
                            this.filterResult.areaCode = '';
                        }
                    }
                } else {
                    j.choosed = !j.choosed;
                    let index = this.filterResult[i.searchKey].findIndex(val => {
                        return val === j.code;
                    });
                    if (index === -1) {
                        this.filterResult[i.searchKey].push(j.code);
                    } else {
                        this.filterResult[i.searchKey].splice(index, 1);
                    }
                }
            },
            // 开始日期值改变时触发
            startDayChange() {
                this.filterResult.startDay = this.startDay;
            },
            // 结束日期值改变时触发
            endDayChange() {
                if (
                    Number(new Date(this.endDay)) < Number(new Date(this.startDay))
                ) {
                    this.$tool.toast('交易日期错误');
                    this.endDay = '';
                    return;
                }
                this.filterResult.endDay = this.endDay;
            },
            // 开始金额失去焦点时触发
            startAmtBlur() {
                let v = this.$tool;
                if (v.checkValEmpty(this.startAmt)) {
                    this.canClick = true;
                    this.filterResult.startAmt = this.startAmt;
                } else {
                    this.startAmt = Number(this.startAmt);
                    if (isNaN(this.startAmt)) {
                        v.toast('请输入正确的数字');
                        this.startAmt = '';
                        this.canClick = false;
                    } else {
                        this.canClick = true;
                        this.filterResult.startAmt = this.startAmt;
                    }
                }
            },
            // 结束金额失去焦点时触发
            endAmtBlur() {
                let v = this.$tool;
                if (v.checkValEmpty(this.endAmt)) {
                    this.canClick = true;
                    this.filterResult.endAmt = this.endAmt;
                } else {
                    this.endAmt = Number(this.endAmt);
                    if (isNaN(this.endAmt)) {
                        v.toast('请输入正确的数字');
                        this.endAmt = '';
                        this.canClick = false;
                    } else {
                        this.canClick = true;
                        this.filterResult.endAmt = this.endAmt;
                    }
                }
            },
            // 底部【确定】按钮，回调函数，返回选中的筛选值
            confirm() {
                if (this.canClick) {
                    if (Number(this.endAmt) < Number(this.startAmt)) {
                        this.$tool.toast('交易金额错误');
                        return;
                    }
                    let result = this.$copy(this.filterResult);
                    for (let k in result) {
                        if (this.$tool.checkValEmpty(result[k])) delete result[k];
                    }
                    this.hideFilter();
                    this.$emit('on-filter', result);
                } else this.canClick = true;
            },
            // 初始化筛选数据
            init(flag) {
                if (this.filterList.length) {
                    this.filterList.map(val => {
                        if (flag === 'init') this.$set(val, 'open', false);
                        let value = this.one ? val.type : [];
                        this.$set(this.filterResult, val.searchKey, value);
                        val.data.map(_val => this.$set(_val, 'choosed', false));
                    });
                    this.startDay = '';
                    this.endDay = '';
                    this.startAmt = '';
                    this.endAmt = '';
                    if (this.calendar) {
                        this.filterResult.startDay = '';
                        this.filterResult.endDay = '';
                    }
                    if (this.amt) {
                        this.filterResult.startAmt = '';
                        this.filterResult.endAmt = '';
                    }
                }
                if (flag === 'reset' && this.showArea) this.initArea('reset');
            },
            // 初始化省市区筛选数据
            initArea(flag) {
                this.areaInfo.map(val => {
                    if (flag === 'init') this.$set(val, 'open', true);
                    this.$set(this.filterResult, val.searchKey, '');
                    val.data.map(_val => this.$set(_val, 'choosed', false));
                });
                this.areaInfo[1].data = [];
                this.areaInfo[2].data = [];
            },
            // 隐藏筛选组件
            hideFilter() {
                this.$emit('hideFilter', false);
                this.$emit('update:show', false);
            }
        },
        watch: {
            list(val) {
                this.filterList = this.$copy(val);
                this.init('init');
            }
        },
        activated() {
            this.filterList = this.$copy(this.list);
            this.init('init');
            if (this.showArea) {
                this.$api.getOrgAreaInfo({orgType: 2}).then(res => {
                    this.areaInfo[0].data = this.$copy(res.body);
                    this.initArea('init');
                });
            }
        }
    };
</script>

<style lang='less' scoped>
    .f-filter {
        position: fixed;
        top: 0;
        left: 0;
        z-index: 500;
        width: 100%;
        height: 100%;
        background-color: rgba(0, 0, 0, 0.6);
        .filter-warp {
            height: 100%;
            margin-left: 75px;
            background-color: #fff;
            .filter-title {
                height: 44px;
                line-height: 44px;
                padding: 0 12px;
                font-size: @font-size-medium;
                color: @color-text-placeholder;
                background-color: @backgroundColor;
            }
            .filter-content {
                height: calc(~'100% - 88px');
                overflow-y: auto;
                padding: 0 12px;
                .content-item {
                    margin-bottom: 12px;
                    .content-title {
                        display: flex;
                        align-items: center;
                        justify-content: space-between;
                        height: 37px;
                        .title {
                            color: @color-text-main;
                            font-size: @font-size-medium;
                        }
                        .iconfont {
                            color: @color-text-placeholder;
                            font-size: @font-size-medium;
                        }
                        .up {
                            transform: rotate(-90deg);
                        }
                        .down {
                            transform: rotate(90deg);
                        }
                    }
                    .content-list {
                        .list-item {
                            display: inline-block;
                            width: 32%;
                            height: 44px;
                            margin-bottom: 2%;
                            margin-right: 2%;
                            text-align: center;
                            line-height: 44px;
                            color: @color-text-main;
                            font-size: @font-size-small;
                            background-color: @backgroundColor;
                            overflow: hidden;
                            vertical-align: bottom;
                            &:nth-child(3n) {
                                margin-right: 0;
                            }
                        }
                        .liChoosed {
                            color: #fff;
                            background-color: @color-button-normal;
                        }
                    }
                    .calendarDiv {
                        display: flex;
                        align-items: center;
                        .line {
                            height: 44px;
                            line-height: 44px;
                        }
                    }
                    .amtStyle {
                        & /deep/ .weui-cells {
                            &::before,
                            &::after {
                                display: none;
                            }
                            .amtDiv {
                                display: flex;
                                align-items: center;
                                .weui-cell {
                                    flex: 1;
                                    padding: 0;
                                    &::before,
                                    &::after {
                                        display: none;
                                    }
                                    .weui-input::-webkit-input-placeholder {
                                        font-size: @font-size-small;
                                    }
                                }
                            }
                        }
                    }
                }
            }
            .filter-footer {
                display: flex;
                & /deep/ .f-button-component {
                    flex: 1;
                    .f-button {
                        margin: 0;
                    }
                }
            }
        }
    }
</style>
