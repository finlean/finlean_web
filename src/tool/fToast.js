/**
 * Created by c.y on 2018/3/16.
 * 组件的命名 项目名（F---filean) + 组件的描述（区别与框架的组件）
 * vux的全局非文字提示toast的重新封装，主要用于后台返回错误状态的码的提示
 * 以及input输入框不合要求的，弹出的提示。
 */

import Vue from 'vue';

import {ToastPlugin, AlertPlugin} from 'vux';
Vue.use(ToastPlugin);
Vue.use(AlertPlugin);
export default {
    // toast提示
    toast(text) {
        Vue.$vux.toast.show({
            width: '80%',
            type: 'text',
            time: 2000,
            position: 'middle',
            text: text
        });
    }
};
