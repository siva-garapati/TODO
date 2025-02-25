let bcrypt = require("bcrypt")
let jwt = require("jsonwebtoken")
const UserModel = require("../models/UserModel")
let { v4: uuidv4 } = require("uuid")

let reg = async (req, res) => {
    try {
        let obj = await UserModel.findOne({'email':req.body.email})
        if (obj) {
            return res.json({'msg':"email already exists"})
        }
        let hash = await bcrypt.hash(req.body.password, 10)
        let data = new UserModel({
            "_id":uuidv4(),
            email:req.body.email,
            "name":req.body.name,
            password: hash })
        await data.save()
        return res.json({'msg':"reg successful"})
    }
    catch (err) {
        return res.json({ 'err': `register error ${err.message}` })
    }
}

let login = async (req, res) => {
    try {
        let obj = await UserModel.findOne({'email':req.body.email})

        if(!obj){
            return res.json({'msg':"email not exists"})
        }

        let f = await bcrypt.compare(req.body.password, obj.password)
        if (!f) {
            return res.json({'msg':"password wrong"})
        }

        let token = jwt.sign({ _id: obj._id }, 'key');
        return res.json({ 'msg': "Login successful", token, 'name':obj.name });
    }
    catch (err) {
        return res.json({'err':"error in login"})
    }
}

let islogin = (req, res, next) => {
    try {
        jwt.verify(req.headers.authorization, "key")
        next()
    }
    catch (err) {
        res.send("pls login")
    }
}

module.exports = { reg, login, islogin }