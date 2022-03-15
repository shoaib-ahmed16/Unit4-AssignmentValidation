const express = require("express")

const userController = require("./controller/user.controller.js")


const app = express();

app.use(express.json())

app.use("/user",userController)


module.exports =app;