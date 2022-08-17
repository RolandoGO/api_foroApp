import express from "express"
import requestTokenCheck from "../../utils/requestTokenCheck.js"
import logoutControler from "../../controls/logoutControl/index.js"

const Route = express.Router()


Route.post("/" , requestTokenCheck, logoutControler )


export default Route