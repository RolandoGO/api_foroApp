import express from "express"
import logoutControler from "../../controls/logoutControl/index.js"

const Route = express.Router()


Route.post("/" ,  logoutControler )


export default Route