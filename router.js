const express = require("express")
const {post_data, get_data, update_data, delete_data, login}=require("./crud")

const route = express.Router()

route.post("/creat",post_data)
route.get("/view",get_data)
route.put("/update/:id",update_data)
route.delete("/delete/:id",delete_data)
route.post("/login/",login)


module.exports = route