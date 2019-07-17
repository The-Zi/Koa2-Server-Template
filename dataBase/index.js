/*
 * @Author: The-Zi
 * @Date: 2019-07-16 09:13:35
 * @Last Modified by: The-Zi
 * @Last Modified time: 2019-07-16 09:18:41
 */




//  =============== 导入模块 ===============
// 项目配置文件
const config = require('../config');
// MySQL
var mysql = require('mysql');




//  =============== 模块方法 ===============
module.exports = {
    // 基础数据库
    base: function (params = {}) {
        // 数据库配置信息
        var baseDB = mysql.createConnection(config.mySqlConfig.db1);

        // 执行连接
        baseDB.connect();

        return baseDB;
    }
};
