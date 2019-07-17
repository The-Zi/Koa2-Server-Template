/*
 * @Author: The-Zi
 * @Date: 2019-03-12 17:25:25
 * @Last Modified by: The-Zi
 * @Last Modified time: 2019-03-12 18:02:51
 */




//  =============== 模块方法 ===============
module.exports = {
    // API权限类型
    type: 'private',
    // API执行入口
    entry: function (params = {}) {
        let { ctx, next } = params;
        console.log('Test API...');
    }
};
