const Koa = require('koa');
const koaBody = require('koa-body');
// const Body = require('koa-body');
const { connect } = require('./db');
const registerRoutes = require('./routers');
const cors = require('@koa/cors');
const { middleware: koaJwtMiddleware, checkUser, catchTokenError } = require('./helpers/token');
const { logMiddleware } = require('./helpers/log');
const path = require('path');
const config = require('./project.config');




const app = new Koa();



connect() . then( () =>{
  app.use(cors());
  app.use(koaBody({
    multipart: true,
    formidable: {
      maxFileSize: 200 * 1024 * 1024,
    },
  }));
  
  app.use(catchTokenError);
  koaJwtMiddleware(app); 
  app.use(logMiddleware);
  app.use(checkUser);

  registerRoutes(app);
  // 开启一个 http 服务
  // 接受 http 请求 并作处理，处理完后响应
app.listen(3000, () => {
    console.log('启动成功');
  });
});
