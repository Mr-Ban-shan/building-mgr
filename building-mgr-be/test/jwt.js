var jwt = require('jsonwebtoken');
var token = jwt.sign({
  account: 'a.cc.com',
  _id: '123',
}, 'aaaa');

console.log(token);//身份认证

// header
// 加密的算法 sha256
// jwt

// payload

// signature

jwt.verify(token, 'aaaabb', (err, payload) => {
  console.log(err, payload);
});
