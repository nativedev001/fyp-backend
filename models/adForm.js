const mongoose = require('mongoose');

const imageSchema = new mongoose.Schema({
    imageName: {
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
    image:[imageSchema],
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