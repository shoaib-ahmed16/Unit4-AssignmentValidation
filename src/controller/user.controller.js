const express = require("express")

const { body, validationResult } = require("express-validator");

const User =require("../model/user.schema.model.js")

const router =express.Router();

router.post("/",
body("first_name")
.trim()
.not()
.isEmpty().withMessage("First_name must contain proper Name")
.bail()
,
body("last_name")
.trim()
.not()
.isEmpty().withMessage("last_name must contain proper last Name")
.bail(),
body("email")
.isEmail().withMessage("Provided Email is not the valid Email id")
.custom(
async (value)=>{
    const userFind = await User.find({email:value}) 

    if(!userFind)
    {
        throw new Error("Email is already Exist")
    }
    return true;
}).bail(),
body("pincode")
.not()
.isEmpty().withMessage("Pincode cannot be left empty")
.isNumeric().withMessage("Pincode Must be numeric value")
.custom(
async (value)=>{

    if(value.length !=6)
    {
        throw new Error("Pincode must have six digit Number")
    }

    return true;
}).bail(),
body("age")
.not()
.isEmpty().withMessage("Age cannot be left empty")
.isNumeric().withMessage("Age Must be numeric value")
.custom(
async (value)=>{
    if( value<1 || value>100)
    {
        throw new Error("Age must be in between 1 & 100")
    }
    return true;
}).bail(),
body("gender")
.not()
.isEmpty().withMessage("Gender must be Provide")
.custom(async (value)=>
{
    console.log(value)
    if(value=="Male")
    {
        console.log(value.match("Male"))
        return true;
    }
    else if(value=="Female")
    {
        return true;
    }
    else if(value =="Others")
    {
        return true;
    }
    throw new Error("Gender is not Valid")

}).bail(),
async (req,res)=>{
    try{
        const errors =validationResult(req)
        if(!errors.isEmpty())
        {
            return res.status(400).send({ errors: errors.array() });
        }
        const user = await User.create(req.body);

       return  res.status(201).send(user)

    }
    catch (err) {
       return  res.status(500).send({message:err.message})
    }
}
);

router.get("/",async(req,res)=>{
    try{
        const item = await User.find().lean().exec();
        res.status(200).send(item)
    }
    catch (err)
    {
        res.status(500).send({message:message.err})
    }
})
module.exports = router;