"use strict";
const mongoose = require("mongoose");
const bycrpt = require("bcrypt");

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
    phone: {
        type: Number,
        required: true,
    },
    hash_password: {
        type: String,
        required: true,
    },
    created_at: {
        type: Date,
        default: Date.now,
    },
});

userSchema.methods.comparePassword = function (passwrod) {
    return bycrpt.compareSync(passwrod, this.hash_password);
};

mongoose.model("User", userSchema);
module.exports = mongoose.model('User');
