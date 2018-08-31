/*
 * @Author: hzq
 * @Date: 2018-08-28 17:18:05
 * @Last Modified by: hzq
 * @Last Modified time: 2018-08-31 09:49:17
 * @文件说明: 全局$tool插件
 */
import validator from './validator';
import fToast from './fToast';
export default {
  install(Vue) {
    let tool = {
      ...fToast,
      ...validator
    };
    Vue.prototype.$tool = tool;
    Vue.$tool = tool;
  }
};
