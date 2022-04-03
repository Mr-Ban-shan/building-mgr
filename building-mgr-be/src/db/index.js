
const mongoose = require('mongoose');

const UserSchema=new mongoose.Schema({
  name:String,  
  password:String,
  age:Number,
});

const UserModal=mongoose.model('User',UserSchema);

const connect = () => {
    // 去连接数据库
    mongoose.connect('mongodb://127.0.0.1:27017/good-mgr');

    // 当数据库被打开的时候 做一些事情
    mongoose.connection.on('open', () => {
      console.log('连接数据库成功');

    const user=new UserModal({
        name:'221111111222222222221',
        password:'1',
        age:1,
    });
    user.save();
  });
};

connect();