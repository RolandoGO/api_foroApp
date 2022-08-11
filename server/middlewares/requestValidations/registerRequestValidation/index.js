export default function registerValidation(data, next){

    const regexName = /[\w]{1,100}/
    const regexEmail = /^([\w\d\.\-_]+)@([\w\d\-_]+)\.[\w]{2,8}(\.[\w]{2,8})?$/
    const regexPassword = /[\w\d]{5,15}/

    if(regexEmail.test(data.email) && regexPassword.test(data.password) && regexName.test(data.name) && regexName.test(data.last_name)){
            
     next()
    }
                
    else {
        const error = new Error ("wrong info enter, see the rules for each")
        error.status = 400
        
        next(error)
        
    }

}