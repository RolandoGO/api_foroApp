import jwt from "jsonwebtoken"
import dotenv from "dotenv"
dotenv.config()
import Users from "../../models/UserModel.js"
import generalErrorFunc from "../../utils/generalErrorFunc.js"

// function that takes the token in the headers of the request that the user has, and decode if it is the same token that was created in the login 

export default function requestTokenCheck(req,res,next){

    const token = req.headers["authorization"]
    const tokenChek = token? token.split(" ")[1] : undefined

    
    if(!tokenChek){
        const err = "token not found"
        

        next(generalErrorFunc(err,401))
    }

    else {
        
        jwt.verify(tokenChek, process.env.SECRETE_TOKEN_KEY, (error, user)=>{

            if(error){

                const err = "invalid token"
                

                next(generalErrorFunc(err,403))

            }

            else{

                
                //Checks if the user has the isLogIn propertie in true.
                
                Users.findAll({where:{user_id: user.id}})
                .then(result=>{
                    
                  

                    if(result[0].isLogIn){
                        //passing the user info in the token as user in the req object
                        req.user = user
                        next()
                    } 

                    else{
                        const error = "user is not log in"
                        
                        next(generalErrorFunc(error,401))

                    }
                })
                .catch(()=>{

                    
                    const error = "cant find the user in database"
                    
                    next(generalErrorFunc(error,500))
                })
                
                

            }

        })
    }
    
    

}

