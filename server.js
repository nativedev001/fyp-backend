const express = require('express');
require('dotenv').config();
const bodyParser = require('body-parser');
const connection = require('./connection');
const jwt = require('jsonwebtoken')
const cors = require('cors');

const app = express();
app.use(cors());


PORT = 8000;


connection().then(()=>{
    app.listen(PORT,(err)=>{
    if(err){
        console.log("something went wrong")
    }else{
        console.log("server is running on port", PORT);
    }
    })
})

app.use(bodyParser.urlencoded({extended:true}))
app.use(bodyParser.json());

app.use(function(req,res,next){
    if(req.headers && req.headers.authorization && req.headers.authorization.split(' ')[0] === 'JWT'){
        jwt.verify(req.headers.authorization.split(' ')[1], 'RESTFULAPIs', function(err, decode){
            if(err) req.user = undefined
                req.user = decode;
                next();     
        });
    }else{
        req.user = undefined;
        next();
    }
})

const userRoutes = require('./routes/userRouts');
const formRoutes = require('./routes/formRoute');

app.use('/api/users', userRoutes);
app.use('/api/forms', formRoutes);

app.use(function(req,res){
    res.status(404).send({url:req.originalUrl + 'not found'})
});

module.exports = app

