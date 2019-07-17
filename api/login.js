/*
 * @Author: The-Zi
 * @Date: 2019-03-12 17:31:20
 * @Last Modified by: The-Zi
 * @Last Modified time: 2019-07-17 09:50:51
 */




//  =============== 导入模块 ===============
// 配置信息
const config = require('../config');
// 数据库
const dataBase = require('../dataBase');




//  =============== 模块方法 ===============
module.exports = {
    // API权限类型
    type: 'public',
    // API执行入口
    entry: function (params = {}, sendData= ()=>{}) {
        // 请求参数
        let { ctx, next } = params;
        // SQL语句
        const querySql = 'SELECT * FROM user';
        const addSql = 'INSERT INTO user(userID,userName) VALUES(?,?)';
        const addSqlParams = [1, '蔡徐坤'];

        // 查询处理函数
        const handel = (error, results, fields) => {
            if (results) {
                let res = Object.assign({}, {}, config.statusMsg['200']);
                res.data = results;

                // 发送数据
                sendData({type: 'JSON', body: JSON.stringify(res)});
            } else {
                // 发送数据
                sendData(null);

                // 打印错误信息
                console.log("========== 数据查询错误 ==========")
                console.log(error)
                console.log("========== 字段 ==========")
                console.log(fields)
            }
        };

        // 执行查询
        dataBase.base().query(addSql, addSqlParams,handel);

        // 关闭数据库连接
        dataBase.base().end();
    }
};
