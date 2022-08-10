import express from "express"
import email_password_validation from "../../middlewares/requestValidations/index.js"
import loginControl from "../../controls/loginControl/index.js"
const Route = express.Router()


Route.post("/", email_password_validation, loginControl )


export default Route