/*
 * @Author: hzq
 * @Date: 2018-08-28 17:50:19
 * @Last Modified by: hzq
 * @Last Modified time: 2018-08-30 17:33:28
 * @文件说明: 所有路由处理
 */
import test from './test';
let all = [...test];
let routes = all.map(val => {
  val.name = val.path;
  val.path = '/' + val.path;
  val.component = resolve => {
    require(['@/views/' + val.src + '.vue'], resolve);
  };
  return val;
});

export default routes;
