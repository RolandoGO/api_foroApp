import bcryptjs from "bcryptjs"
import Users from "../../models/UserModel.js"



// function for controling the insert of the user, passes the error of the database to the next middleware if there is anny, hashes the password before insert

export default async function registerControl(req,res,next){


    const {name, email, last_name,password} = req.body
   

    //hashing the password
    bcryptjs.hash(password.toString(),10,(error, hashedPassword)=>{

        if(error){
            const error = new Error("cant hash the password ")
            error.status=500
            next(error)
        }
        //if there is no error in the hash, create the user
        else{

            Users.create({
                user_name:name,
                user_last_name:last_name,
                user_email:email,
                hashedPassword
                
            })
            .then(result=>{res.json(result)})
            //anny errors like duplicate email or null data are catch in here
            .catch(error=>{
                
                const err = new Error(error.parent.sqlMessage || "database validation error")
                err.status = 500
                next(err)
            })

            

        }

   })

        

    


    

   
}

    




