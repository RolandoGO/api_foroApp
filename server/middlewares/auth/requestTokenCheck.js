import jwt from "jsonwebtoken"
import dotenv from "dotenv"
dotenv.config()
import Users from "../../models/UserModel.js"


// function that takes the token in the headers of the request that the user has, and decode if it is the same token that was created in the login 

export default function requestTokenCheck(req,res,next){

    const token = req.headers["authorization"]
    const tokenChek = token? token.split(" ")[1] : undefined

    
    if(!tokenChek){
        const err = new Error("token not found")
        err.status = 401

        next(err)
    }

    else {
        
        jwt.verify(tokenChek, process.env.SECRETE_TOKEN_KEY, (err, user)=>{

            if(err){

                const err = new Error("invalid token")
                err.status = 403

                next(err)

            }

            else{
                //Checks if the user has the isLogIn propertie in true.
                
                Users.findAll({where:{user_id: user.id}})
                .then(result=>{
                    
                  

                    if(result[0].isLogIn){
                        req.user = user
                        next()
                    } 

                    else{
                        const error = new Error("user is not log in")
                        error.status = 403
                        next(error)

                    }
                })
                .catch(()=>{
                    const error = new Error("cant find the user in db")
                    error.status=500
                    next(error)
                })
                
                

            }

        })
    }
    
    

}

