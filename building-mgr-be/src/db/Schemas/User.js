const mongoose = require('mongoose');
const { stringify } = require('querystring');
const { getMeta, preSave } = require('../helpers');

const UserSchema = new mongoose.Schema({
  account: String,
  password: String,
  character: String,
  phone: String,
  
  meta: getMeta(),
});

UserSchema.pre('save', preSave);

mongoose.model('User', UserSchema);