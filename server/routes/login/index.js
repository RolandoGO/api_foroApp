import express from "express"
import loginValidation from "../../middlewares/requestValidations/loginRequestValidation/index.js"
import loginControl from "../../controls/loginControl/index.js"
const Route = express.Router()


Route.post("/", loginValidation , loginControl )


export default Route