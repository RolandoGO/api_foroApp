import express from "express"
import dotenv from "dotenv"
dotenv.config()

import corsConfig from "./middlewares/cors/index.js"
import globalErrorHandler from "./middlewares/herrorHandlers/globalHerrorHandler.js"

//database import
import db from "./dbConfig.js"
//database models import
import UserModel from "./models/UserModel.js"
import PostsModel from "./models/PostsModel.js"
import CommentsModel from "./models/CommentsModel.js"

//files for routes

import landingPageRoute from "./routes/landingPageRoute/index.js"
import foroRoute from "./routes/foroRoutes/index.js"
import loginRoute from "./routes/login/index.js"
import registerRoute from "./routes/register/index.js"
import logoutRoute from "./routes/logout/index.js"

//import middleware to check login status of user request
import requestTokenCheck from "./middlewares/auth/requestTokenCheck.js"

//framework initialization-----
const app= express()
const PORT = process.env.PORT || 5000

//configuration ---------
app.use(corsConfig)
app.use(express.json())


//routes---------------
app.use("/login", loginRoute)
app.use("/logout",requestTokenCheck, logoutRoute)

app.use("/register", registerRoute)

app.use("/landingPage", landingPageRoute )

app.use("/foro", requestTokenCheck, foroRoute)

app.use((req,res,next)=>{

    const error = new Error("Page not Found")
    error.status = 404
    next(error)
})

app.use(globalErrorHandler)

//starting server function --------

async function starting(){

    try{
        //database conection and tables creation....

        await db.authenticate();
        await UserModel.sync()
        await PostsModel.sync()
        await CommentsModel.sync()
        
      
        // await db.drop()
        console.log("conected to the database!!")
        

        app.listen(PORT, ()=>console.log("server runnin in port " + PORT))
    }
    catch(error){

        console.log("Unable to connect to the database " + error )

    }
} 

starting()