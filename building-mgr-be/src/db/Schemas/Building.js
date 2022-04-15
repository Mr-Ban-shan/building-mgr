const mongoose = require('mongoose');
const { getMeta , preSave  } = require('../helpers');
// const _ = require('../../config/common');

const BuildingSchema = new mongoose.Schema({
  // // 建材名
   name: String,
  // // 价格
   price: Number,
  // // 公司
   author: String,
  // // 出版日期
   publishDate: String,
  // // 分类
   classify: String,
  // 库存
  count: Number,
  // ..._.SCHEMA.TOPIC_MGR,

  meta: getMeta(),
});

 BuildingSchema.pre('save', preSave);

mongoose.model('Building', BuildingSchema);
