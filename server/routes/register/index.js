import express from "express"
import register_login_validation from "../../middlewares/requestValidations/general_validation_func.js"
import registerControl from "../../controls/registerControl/index.js"
const Route = express.Router()


Route.post("/", register_login_validation, registerControl )


export default Route