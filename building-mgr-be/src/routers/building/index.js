 const Router = require('@koa/router');
 const mongoose = require('mongoose');
// const config = require('../../project.config');
 const { getBody } = require('../../helpers/utils');
// const { loadExcel, getFirstSheet } = require('../../helpers/excel');
// const _ = require('../../config/common');

const BUILDING_CONST = {
  IN: 'IN_COUNT',
  OUT: 'OUT_COUNT',
};

 const Building = mongoose.model('Building');
// const InventoryLog = mongoose.model('InventoryLog');
// const GoodClassify = mongoose.model('GoodClassify');

const findOne = async (id) => {
  const one = await Building.findOne({
    _id: id,
  }).exec();

  return one;
};

 const router = new Router({
   prefix: '/building',
 });

 router.get('/list', async (ctx) => {
//   // https://aa.cc.com/user?page=2&size=20&keyword=书名#fdsafds
   const {
     page = 1,
     keyword = '',
   } = ctx.query;

  let = {
    size = 10,
  } = ctx.query;

  size = Number(size);

//   // 2 20
//   // 20 20
//   // (page - 1) * size

  const query = {};

  if (keyword) {
    query.name = keyword;
  }

   const list = await Building
     .find(query)
//     .sort({
//       _id: -1,
//     })
     .skip((page - 1) * size)
     .limit(size)
     .exec();

   const total = await Building.countDocuments();

  ctx.body = {
    data: {
      total,
      list,
      page,
      size,
    },
    code: 1,
    msg: '获取列表成功',
  };
 });

router.delete('/:id', async (ctx) => {
  const {
    id,
  } = ctx.params;

  const delMsg = await Building.deleteOne({
    _id: id,
  });

  ctx.body = {
    data: delMsg,
    msg: '删除成功',
    code: 1,
  };
});

 router.post('/update/count', async (ctx) => {
  const {
    id,
    type,
  } = ctx.request.body;

  let {
    num,
  } = ctx.request.body;

  num = Number(num);

  const building = await Building.findOne({
    _id: id,
  }).exec();

  if (!building) {
    ctx.body = {
      code: 0,
      msg: '没有找到书籍',
    };

    return;
  }

  // 找到了书
  if (type === BUILDING_CONST.IN) {
    // 入库操作
    num = Math.abs(num);
  } else {
    // 出库操作
    num = -Math.abs(num);
  }

  building.count = building.count + num;

  if (building.count < 0) {
    ctx.body = {
      code: 0,
      msg: '剩下的量不足以出库',
    };
    return;
  }

  const res = await building.save();

//   const log = new InventoryLog({
//     num: Math.abs(num),
//     type,
//   });

//   log.save();

  ctx.body = {
    data: res,
    code: 1,
    msg: '操作成功',
  };
 });

 router.post('/update', async (ctx) => {
  const {
    id,
    ...others
  } = ctx.request.body;

   const one = await Building.findOne({
     _id: id,
   }).exec();

  // 没有找到书
  if (!one) {
    ctx.body = {
      msg: '没有找到',
      code: 0,
    }
    return;
  }

   const newQuery = {};

  Object.entries(others).forEach(([key, value]) => {
    if (value) {
      newQuery[key] = value;
    }
  });

   Object.assign(one, newQuery);

   const res = await one.save();

  ctx.body = {
    data: res,
    code: 1,
    msg: '保存成功',
  };
 });

// router.get('/detail/:id', async (ctx) => {
//   const {
//     id,
//   } = ctx.params;

//   const one = await findGoodOne(id);

//   // 没有找到书
//   if (!one) {
//     ctx.body = {
//       msg: `没有找到${_.KEYWORD}`,
//       code: 0,
//     };

//     return;
//   }

//   ctx.body = {
//     msg: '查询成功',
//     data: one,
//     code: 1,
//   };
// });

// router.post('/addMany', async (ctx) => {
//   const {
//     key = '',
//   } = ctx.request.body;

//   const path = `${config.UPLOAD_DIR}/${key}`;

//   const excel = loadExcel(path);

//   const sheet = getFirstSheet(excel);

//   const arr = [];
//   for (let i = 0; i < sheet.length; i++) {
//     let record = sheet[i];

//     const [
//       name,
//       price,
//       producedDate,
//       expirationDate,
//       classify,
//       count,
//     ] = record;

//     let classifyId = classify;

//     const one = await GoodClassify.findOne({
//       title: classify,
//     });

//     if (one) {
//       classifyId = one._id;
//     }

//     arr.push({
//       name,
//       price,
//       producedDate,
//       expirationDate,
//       classify: classifyId,
//       count,
//     });
//   }

//   await Good.insertMany(arr);

//   ctx.body = {
//     code: 1,
//     msg: '添加成功',
//     data: {
//       addCount: arr.length,
//     },
//   };
// });

 router.post('/add', async (ctx) => {
   const {
     name,
     price,
     author,
     publishDate,
     classify,
     count,
   } = getBody(ctx);

   const building = new Building({
      name,
      price,
      author,
      publishDate,
      classify,
      count,
   });

   const res = await building.save();

   ctx.body = {
     data: res,
     code: 1,
     msg: '添加成功',
   };
 });

 module.exports = router;
