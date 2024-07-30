const errhandle = require("./errmsg")
const data_schema = require("./schema")
const bcrypt = require("bcrypt")



const post_data = async (req, res) => {
    const password = await bcrypt.hash(req.body.password, 7)
    const data = new data_schema({
        ...req.body,
        password: password
    })

    const email = await data_schema.findOne({email:req.body.email})
    if (email) {return res.json("email is alread registed")}
    const save = await data.save()
    
    res.json(save)

}

const login = async (req,res,next)=>{

    const email = await data_schema.findOne({email:req.body.email})
    if (!email) return next(errhandle("401","email is incorrect"))
    console.log(email)

    const passcode = await bcrypt.compare(req.body.password,email.password)
    if (!passcode) return res.json("401","password is incorrect")

    res.json("success")

}

const get_data = async (req, res) => {
    const view = await data_schema.find();
    res.json(view)
}

const update_data = async (req, res) => {

    const update = await data_schema.findByIdAndUpdate(req.params.id, { $set: req.body }, { new: true })
    res.json(update)

}

const delete_data = async (req, res) => {
    const deletes = await data_schema.findByIdAndDelete(req.params.id)
    res.json("FILE IS DELETED")
}

module.exports = { post_data, get_data, update_data, delete_data,login }