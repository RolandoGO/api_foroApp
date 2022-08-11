import express from "express"
import registerValidation from "../../middlewares/requestValidations/registerRequestValidation/index.js"
import registerControl from "../../controls/registerControl/index.js"
const Route = express.Router()


Route.post("/", registerValidation, registerControl )


export default Route