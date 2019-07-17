/*
 * @Author: The-Zi
 * @Date: 2019-03-11 17:17:40
 * @Last Modified by: The-Zi
 * @Last Modified time: 2019-07-17 09:25:24
 * @Desc: 控制器入口文件
 */



//  =============== 导入模块 ===============
// NodeJS 文件模块
const fs = require('fs');
// koa路由
const router = require('koa-router')();
// 配置信息
const config = require('../config');




//  =============== 模块方法 ===============
// url到路径
function urlToPath(ctx) {
    let path = ctx.url;
    return path.replace('?' + ctx.querystring, '');
}

// 打开应用程序接口
function openApi(apiParams = {}) {
    // 获取数据
    const getData = (serverApi, netParams, resolve, reject) => {
        // 处理下一个异步函数
        netParams.next();

        // 调用api接口
        serverApi.entry(netParams, (result) => {
            if (result) {
                netParams.ctx.response.type = result.type;
                netParams.ctx.response.body = result.body;
                resolve(result);
            } else {
                netParams.ctx.response.type = 'JSON';
                netParams.ctx.response.body = JSON.stringify(config.statusMsg['500']);
                resolve(result);
            }
        });
    };

    // 通过返回一个Promise函数，达到使用await阻塞默认网络请求返回行为
    return new Promise((res, rej)=>{
        // 应用程序接口
        let api = null;

        // 检查请求的API文件是否存在
        try {
            api = require('.' + apiParams.apiFilePath);
        } catch (error) {
            // 请求的服务器接口不存在
            apiParams.ctx.response.type = 'JSON';
            apiParams.ctx.response.body = JSON.stringify(config.statusMsg['500']);
            console.error(apiParams.apiFilePath + '不存在，或内部代码错误。');
            res(result);
        }

        // 请求的API文件存在
        if (api) {
            // 公开的API接口
            if (api.type === 'public') {
                // 获取数据
                getData(api, apiParams, res, rej);

            // 私有的/带权限限制的API接口
            } else {
                // 检查当前登录用户的权限
                if (false) {
                    // 获取数据
                    getData(api, apiParams, res, rej);
                } else {
                    apiParams.ctx.response.type = 'JSON';
                    apiParams.ctx.response.body = JSON.stringify(config.statusMsg['500']);
                    res(result);
                }
            }
        }
    });
}

// 导出模块
module.exports = async (ctx, next) => {
    // 应用程序接口文件路径
    let apiFilePath;

    // 只有带查询参数的GET方法请求才需要将应用程序接口文件的路径从url中提取出来
    if (ctx.request.method === 'GET' && ctx.querystring) {
        apiFilePath = urlToPath(ctx);
    } else {
        apiFilePath = ctx.url;
    }

    // 打开应用程序接口
    await openApi({ apiFilePath: apiFilePath, ctx: ctx, next: next});
};
