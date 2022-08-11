
// function for validated the body created whit express.json() in the request, and for knowing if it is LOGIN OR REGISTER dependin in the number of proprties
// it returns an object whit an error propertie if there is anny or an object whit the type of process (login or register) and no error
export default function general_validation(data){

    
    let validationPayload={}

    if(data){
        

        if(Object.keys(data).length === 4){
            
            validationPayload.type = "register"
        
        }
        else if(Object.keys(data).length === 2){

            validationPayload.type="login"

        }
        else{
            validationPayload.error = true
           validationPayload.message = "wrong properties in the request"
           validationPayload.status = 400
                

        }
    }

        
    else{
        validationPayload.error = true
        validationPayload.error.message = "no properties in request, send only json data and header type (application/json)"
        validationPayload.error.status = 400


            

    }

    return validationPayload

    
    

}