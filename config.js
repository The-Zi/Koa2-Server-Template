/*
 * @Author: The-Zi
 * @Date: 2019-03-11 17:24:41
 * @Last Modified by: The-Zi
 * @Last Modified time: 2019-07-16 09:18:30
 * @Desc: 配置文件
 */




//  =============== 导出配置信息 ===============
module.exports = {
    // 应用程序名称
    appName: 'Hello-Koa2',
    // 应用程序在服务器上运行的端口
    port: 3000,
    // 状态信息
    statusMsg: {
        "500": {
            code: 500,
            desc: "Error"
        },
        "200": {
            code: 200,
            desc: "Success"
        }
    },
    // mySql配置信息
    mySqlConfig: {
        db1: {
            host: '127.0.0.1',
            user: 'root',
            password: 'root123456',
            database: 'base'
        },
    },
};
