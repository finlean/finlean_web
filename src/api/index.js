/*
 * @Author: hzq
 * @Date: 2018-08-28 15:55:55
 * @Last Modified by: hzq
 * @Last Modified time: 2018-08-31 09:46:36
 * @文件说明: 全局$api插件
 */
import Url from './url';
import Service from './service';
export default {
  install(Vue) {
    let api = {};
    for (let u of Url) {
      let methods = u.methods || 'post';
      api[u.name] = data => Service[methods]('/sib/' + u.url, data);
    }
    Vue.prototype.$api = api;
    Vue.$api = api;
  }
};
