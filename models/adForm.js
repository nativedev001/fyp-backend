const mongoose = require('mongoose');
const cloudinary = require('cloudinary').v2;


cloudinary.config({
    cloud_name: 'dm55kqxna',
    api_key: '473296691162498',
    api_secret: 'HJ5jdvY3Zn1hszS0Ev15Axs0t0c'
});

const imageSchema = new mongoose.Schema({
    imageUrl: {
      type: String,
      required: true
    }
  });

const formSchema = new mongoose.Schema({
    title:{
        type:String,
        require:true,
    },
    category:{
        type:String,
        require:true,

    },
    subcategory:{
        type:String,
        require:true
    },
    price:{
        type:String,
        require:true
    },
    desc:{
        type:String,
        require:true
    },
    images:[imageSchema],
    address:{
        type:String,
        require:true,
    },
    name:{
        type:String,
        require:true,
    },
    phone:{
        type:String,
        require:true
    },
    featured:{
        type:Number,
        require:true
    },
    approve:{
        type:Number,
        require:true
    }
});

const FormModel = mongoose.model('FormSchema', formSchema);

module.exports = FormModel;