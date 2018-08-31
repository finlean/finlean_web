/*
 * @Author: hzq
 * @Date: 2018-08-28 17:45:25
 * @Last Modified by: hzq
 * @Last Modified time: 2018-08-30 17:47:22
 * @文件说明: 测试路由
 */
// name不需要写，因为我们的项目里面path与name是相同的，所以只需要写path
export default [
  {
    path: 'test', // 路由路径，不需要再加斜杠(/)，已经自动处理了
    src: 'test' // 路由文件路径，以@/views/开始的路径，因为@/views/已经自动处理了
  }
];
