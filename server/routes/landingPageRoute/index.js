import express from "express"
const Route = express.Router()


Route.get("/", (req,res)=> res.send("welcome to the landin Page"))


export default Route