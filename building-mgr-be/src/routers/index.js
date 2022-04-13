const auth = require('./auth/index');
const inviteCode = require('./invite-code/index');
const building = require('./building');
const inventoryLog = require('./inventory-log');
const user = require('./user');
const character = require('./character');

module.exports = (app) => {
    app.use(auth.routes());
    app.use(inviteCode.routes());  //随即生成的
    app.use(building.routes());
    app.use(inventoryLog.routes());
    app.use(user.routes());
    app.use(character.routes());
};