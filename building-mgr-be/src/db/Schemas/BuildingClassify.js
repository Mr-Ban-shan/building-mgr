const mongoose = require('mongoose');
const { getMeta, preSave } = require('../helpers');

const BuildingClassifySchema = new mongoose.Schema({
  title: String,

  meta: getMeta(),
});

BuildingClassifySchema.pre('save', preSave);

mongoose.model('BuildingClassify', BuildingClassifySchema);
