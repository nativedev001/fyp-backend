const mongoose = require('mongoose');

const adSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  category: {
    type: String,
    required: true,
  },
  subcategory: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  desc: {
    type: String,
    required: true,
  },
  images: [{
    url: {
      type: String,
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
  }],
  address: {
    type: String,
    required: true,
  },
  phone: {
    type: String,
    required: true,
  },
  approve: {
    type: Number,
    default: 0,
  },
  featured: {
    type: Number,
    default: 0,
  },
  userId:{
    type:String,
    required: true,
  }
});

module.exports = mongoose.model('Ad', adSchema);