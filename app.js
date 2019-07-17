/*
 * @Author: The-Zi
 * @Date: 2019-03-11 15:40:18
 * @Last Modified by: The-Zi
 * @Last Modified time: 2019-07-16 17:16:25
 * @Desc:  应用程序启动文件
 */



// =============== 导入模块 ===============
// 导入koa，和koa 1.x不同，在koa2中，我们导入的是一个class，因此用大写的Koa表示:
const Koa = require('koa');
// 处理POST请求
const bodyParser = require('koa-bodyparser');
// 处理应用程序接口
const handleAPI = require('./api');
// 配置文件
const config = require('./config');


// =============== 应用模块 ===============
// 实例化一个Koa对象，表示web app本身
const app = new Koa();

// 给Koa添加POST请求处理模块
app.use(bodyParser());

// 处理应用程序接口
app.use(handleAPI);

// 监听的端口:
app.listen(config.port);
console.log(config.appName + '运行在端口：' + config.port + '...');

// 参考模板
// // 对于任何请求，app将调用该异步函数处理请求：
// app.use(async (ctx, next) => {
//     await next();
//     // 第二个中间件
//     console.log('Two')

//     // 设置response的Content-Type:
//     ctx.response.type = 'text/html';
//     // 设置response的内容:
//     ctx.response.body = '<h1>Hello, koa2!222</h1>';

//     // // 设置response的Content-Type:
//     // ctx.response.type = 'JSON';
//     // // 设置response的内容:
//     // ctx.response.body = {
//     //     code: 200,
//     //     desc: 'Test'
//     // };
// });

// // 权限检查
// const permissionCheck = async (ctx, next) => {
//     let url = ctx.request.url;
//     console.log(url)


//     if (ctx.method === 'GET') {
//         console.log(ctx.query)
//         console.log(ctx.querystring)
//     }

//     if (ctx.method === 'POST') {
//         console.log(ctx.query)
//         console.log(ctx.querystring)
//     }
//     if (url === '/home') {
//         await next();
//     } else {
//         console.log(2)
//         ctx.response.type = 'JSON';
//         ctx.response.body = {
//             'code': 500,
//             'desc': 'Error'
//         };
//     }
// };

// // 成功
// const success = async (ctx, next) => {
//     ctx.response.type = 'JSON';
//     ctx.response.body = {
//         'code': 200,
//         'desc': 'Success'
//     };
//     await next();
// };


// // 回调函数列表
// const asyncList = [
//     // 权限检查
//     permissionCheck,
//     // 成功
//     success
// ];

// // 批量应用回调函数
// asyncList.map((item, index)=>{
//     app.use(item);
// });
