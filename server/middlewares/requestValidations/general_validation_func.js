import registerValidation from "./registerRequestValidation/index.js"
import loginValidation from "./loginRequestValidation/index.js"

export default function register_login_validation(req,res,next){


    if(req.body){
        if(Object.keys(req.body).length > 0){

            if(req.body.email && req.body.password && req.body.name && req.body.last_name){

                registerValidation(req.body,next)

            }
            else if(req.body.email && req.body.password){

                loginValidation(req.body, next)

            }
            else{
                const error = new Error("wrong properties in the request")
                error.status = 400
                next(error)

            }

        }
        else{

            const error = new Error("no properties in request, send only json data and header type (application/json)")
            error.status = 400
            next(error)

        }

    }
    else{

        const error = new Error("bad request")
        error.status = 400
        next(error)
    }

}