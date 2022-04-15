const Router = require('@koa/router');
const mongoose = require('mongoose');
const { v4: uuidv4 } = require('uuid');
/* const _ = require('../../config/common'); */

// const { getBody } = require('../../helpers/utils');

const BuildingClassify = mongoose.model('BuildingClassify');

const router = new Router({
  prefix: '/building-classify',
});

router.get('/list', async (ctx) => {
  const list = await BuildingClassify.find().sort({
    _id: -1,
  }).exec();

  ctx.body = {
    data: list,
    code: 1,
    msg: '获取成功',
  };
});

router.post('/add', async (ctx) => {
  const {
    title,
  } = ctx.request.body;

  const one = await BuildingClassify.findOne({
    title,
  }).exec();

  if (one) {
    ctx.body = {
      code: 0,
      msg: '建材分类已经存在',
    };
    return;
  }

  const buildingClassify = new BuildingClassify({
    title,
  });

  const saved = await buildingClassify.save();

  ctx.body = {
    data: saved,
    code: 1,
    msg: '添加成功',
  }
});

router.delete('/:id', async (ctx) => {
  const {
    id,
  } = ctx.params;

  const res = await BuildingClassify.deleteOne({
    _id: id,
  });

  ctx.body = {
    data: res,
    code: 1,
    msg: '删除成功',
  };
});

router.post('/update/title', async (ctx) => {
  const {
    id,
    title,
  } = ctx.request.body;

  const one = await BuildingClassify.findOne({
    _id: id,
  });

  if (!one) {
    ctx.body = {
      msg: '资源不存在',
      code: 0,
    };
    return;
  }

  one.title = title;

  const res = await one.save();

  ctx.body = {
    data: res,
    msg: '修改成功',
    code: 1,
  };
});

module.exports = router;