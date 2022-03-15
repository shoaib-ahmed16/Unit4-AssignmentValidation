const database =require("./configue/database.js")

const app = require("./index.js")


app.listen(5432,async ()=>{
    try{
       await database()

       console.log("Listening LocalHost:5432")
    }
    catch (err)
    {
        console.log({Message_dataBase:err.message})
    }
    
})
