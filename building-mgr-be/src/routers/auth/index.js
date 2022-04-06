const Router = require('@koa/router');
const mongoose = require('mongoose');


const User = mongoose.model('User'); 

const router = new Router({
    prefix: '/auth',
  });
  

  router.post('/register', async (ctx) => {
    const {
      account,
      password,
    } = ctx.request.body;

        // 去找 account 为 传递上来的 “account” 的用户
  const findUser = await User.findOne({
    account,
  }).exec();

  // 判断有没有用户
  if (findUser) {
    // 如果有 表示已经存在
    ctx.body = {
      code: 0,
      msg: '已存在该用户',
      data: null,
    };
    return;
  }

      const user=new User({
        account,
        password,
      });
  
      const res= await user.save();

      ctx.body={
        code:1,
        msg:'注册成功',
         data:res, 
      } ;
  });  




  router.post('/login', async (ctx) => {
      
  });  

module.exports = router;