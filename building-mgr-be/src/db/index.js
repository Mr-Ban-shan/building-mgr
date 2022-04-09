
require('./Schemas/User'); 
require('./Schemas/InviteCode');
require('./Schemas/Building');

const mongoose = require('mongoose');

 /* const UserSchema=new mongoose.Schema({
  name:String,  
  password:String,
  age:Number,
});
 
 const UserModal=mongoose.model('user',UserSchema);  */ 


const connect = () => {
  return new Promise((resolve) => { 
    // 去连接数据库
    mongoose.connect('mongodb://127.0.0.1:27017/building-mgr');

    // 当数据库被打开的时候 做一些事情
    mongoose.connection.on('open', () => {
      console.log('连接数据库成功');
      resolve(); 
    /* const user=new UserModal({
        name:'22111111112222222222222222222222222211',
        password:'1',
        age:1,
    }); 
    user.save(); */ 

    
       
    });
  });
}; 
/* connect(); */


module.exports = {
  connect,
}; 