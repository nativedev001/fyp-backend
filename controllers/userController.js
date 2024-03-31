const bycrpt = require('bcrypt');
const bodyParser = require('body-parser')
const jwt = require('jsonwebtoken');
const { default: mongoose } = require('mongoose');
const userSchema = require('../models/user');

//register user
exports.register = async function (req, res) {
    try {
        const newUser = new userSchema(req.body);
        newUser.hash_password = bycrpt.hashSync(req.body.password, 10);
        
        const savedUser = await newUser.save();
        savedUser.hash_password = undefined;
        return res.json(savedUser);
    } catch (err) {
        return res.status(400).send({
            message: err.message || "An error occurred while saving the user."
        });
    }
};

//login user

exports.login = async function (req, res) {
    try {
        const user = await userSchema.findOne({
            email: req.body.email,
        });

        if (!user || !user.comparePassword(req.body.password)) {
            return res.status(401).json({ message: "Authentication failed. Invalid user or password." });
        }

        const token = jwt.sign({ email: user.email, fullName: user.name, _id: user._id }, 'RESTFULAPIs');
        return res.json({ token });
    } catch (err) {
        return res.status(500).json({ message: "An error occurred during login." });
    }
};


//check user exist or not
exports.loginRequired = function(req,res, next){
    if(req.user){
        next();
    }else{
        return res.status(401).json({message:"Unothrized user !!"});
    }
}

//get user data
exports.profile = function(req,res, next){
if(req.user){
    res.send(req.user);
    // next();
}else{
    return res.status(401).json({message:"invalid token"})
}
}