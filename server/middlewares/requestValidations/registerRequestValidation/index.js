import general_validation from "../general_validation_func.js";
import generalErrorFunc from "../../../utils/generalErrorFunc.js"
// function middleware for validating the inputs of the register data, passes the error to the next middleware, if not error gos to the register control
export default function registerValidation(req,res, next){



    const data = req.body

    const validation = general_validation(data)


    if(validation.error)next(validation)

    else{

        if(validation.type==="register"){
            const regexName = /^[a-zA-Z ]{1,100}$/
            const regexEmail = /^([\w\d\.\-_]+)@([\w\d\-_]+)\.[\w]{2,8}(\.[\w]{2,8})?$/
            const regexPassword = /^[\w\d]{5,15}$/

            if(regexEmail.test(data.email) && regexPassword.test(data.password) && regexName.test(data.name) && regexName.test(data.last_name)){
            
                next()
            }
                
            else {
                const error = "you enter the wrong info for register, see the rules for each input"
                
                
                next(generalErrorFunc(error,400))
        
            }

        }
        else{
            const error = "the data that you enter is for the login"
            
            
            next(generalErrorFunc(error,400))        
        }
        
    }

    

}