import general_validation from "../general_validation_func.js"


//function middleware for validating the inputs data of the login, passes the error to the next middleware or activates the login control
export default function loginValidation(req,res, next){

    const data = req.body

    const validation = general_validation(data)

    if(validation.error)next(validation)
    else{

        if(validation.type==="login"){

            const regexEmail = /^([\w\d\.\-_]+)@([\w\d\-_]+)\.[\w]{2,8}(\.[\w]{2,8})?$/
            const regexPassword = /[\w\d]{5,15}/

            if(data.email && data.password && regexEmail.test(data.email) && regexPassword.test(data.password)){
            
                next()
            }
                
            else {
                const error = new Error ("Email or password donset exist or wrong email or password, see the rules for each")
                error.status = 400
                
                next(error)
        
            }

        }

        else{
            const error = new Error("you enter the data for the register process")
            error.status = 400
            next(error)
        }
    }
    
}