export default function email_password_validation(req,res,next){


    if(req.body){
        if(Object.keys(req.body).length > 0){

            if(req.body.email && req.body.password){

                const regexEmail = /^([\w\d\.\-_]+)@([\w\d\-_]+)\.[\w]{2,8}(\.[\w]{2,8})?$/
                const regexPassword = /[\w\d]{5,15}/

                if(regexEmail.test(req.body.email) && regexPassword.test(req.body.password)){
            
                    next()
                }
                
                else {
                    const error = new Error ("wrong email or password, see the rules for each")
                    error.status = 400
        
                    next(error)
        
                }

            }
            else{
                const error = new Error("only email and password accepted in the request")
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