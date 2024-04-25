import mongoose from "mongoose";

const ImageTest = mongoose.model(
    'image',
    mongoose.Schema({
        imageUrl:String,
    })
)