export default function loginValidation(data, next){

    const regexEmail = /^([\w\d\.\-_]+)@([\w\d\-_]+)\.[\w]{2,8}(\.[\w]{2,8})?$/
    const regexPassword = /[\w\d]{5,15}/

    if(regexEmail.test(data.email) && regexPassword.test(data.password)){
            
        next()
    }
                
    else {
        const error = new Error ("wrong email or password, see the rules for each")
        error.status = 400
        
        next(error)
        
    }
}