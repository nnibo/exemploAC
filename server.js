const mongoose = require("mongoose");
const express = require("express");
const cors = require("cors")
const bodyParser = require("body-parser");

// conexao mongodb
mongoose.connect("mongodb://127.0.0.1:27017/rev", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    serverSelectionTimeoutMS: 20000
});

//configuracao basica
const router = require('express').Router();
const app = express();
app.use(bodyParser.json());

//models
const UserSchema = new mongoose.Schema({
    name: { type : String},
    email :{ type :  String, required : true},
    password : { type : String, required : true}
});

const User = mongoose.model('User', UserSchema);

//criando rota de teste
router.post("/cadastro", async (req, res) => {
    const name = req.body.name;
    const email = req.body.email;
    const password = req.body.password

    /* 
    && - E
    || - OU
    ! = não
    */
const User = new User({
    name : name,
    email : email,
    password : password
})
    if(name == null || email == null || passowrd == null){
        return res.status(400).json({error : "Digite os campos corretamente"})
    }

    try {
        const newUser = await User.save();
        res.json({error : null, msg: "Cadastro ok!!"})
    }
    catch(error){
        req.status(400).json({error})
    };
})
