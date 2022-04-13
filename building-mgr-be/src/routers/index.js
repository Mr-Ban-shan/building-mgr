const auth = require('./auth/index');
const inviteCode = require('./invite-code/index');
const building = require('./building');
const inventoryLog = require('./inventory-log');
const user = require('./user');
const character = require('./character');
const log = require('./log');
/* const forgetPassword = require('./forget-password');
const goodClassify = require('./good-classify');
const profile = require('./profile');
const dashboard = require('./dashboard');
const upload = require('./upload'); */

module.exports = (app) => {
    app.use(auth.routes());
    app.use(inviteCode.routes());  //随即生成的
    app.use(building.routes());
    app.use(inventoryLog.routes());
    app.use(user.routes());
    app.use(character.routes());
    app.use(log.routes());
    /* app.use(forgetPassword.routes());
    app.use(goodClassify.routes());
    app.use(profile.routes());
    app.use(dashboard.routes());
    app.use(upload.routes()); */
}; 