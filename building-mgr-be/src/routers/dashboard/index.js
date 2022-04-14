const Router = require('@koa/router');
const mongoose = require('mongoose');
const { v4: uuidv4 } = require('uuid');
const config  = require('../../project.config');

const User = mongoose.model('User');
const Building = mongoose.model('Building');
const Log = mongoose.model('Log');

const router = new Router({
  prefix: '/dashboard',
});

router.get('/base-info', async (ctx) => {
  const buildingTotal = await Building.countDocuments();
  const userTotal = await User.countDocuments();
  const logTotal = await Log.find({ show: true }).countDocuments();

  ctx.body = {
    code: 1,
    msg: '获取成功',
    data: {
      total: {
        building: buildingTotal,
        user: userTotal,
        log: logTotal,
      },
    },
  };
});

module.exports = router;
