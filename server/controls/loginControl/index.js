import Users from "../../models/UserModel.js"
import bcryptjs from "bcryptjs"
import loginTokenGenerate from "../../utils/loginTokenGenerate.js"
import generalErrorFunc from "../../utils/generalErrorFunc.js"
import generalResponseObj from "../../utils/generalResponseObj.js"

export default async function loginControl(req,res,next){

    const data = req.body
    const formPassword = data.password.toString()

    //first find the user that match the email

    Users.findAll({where:{user_email:data.email}})
    .then(result=>{

        if(result.length>0){

            const dbUser=result[0]

            //compare passwords
            bcryptjs.compare(formPassword, dbUser.hashedPassword).then((response) => {

                if(response){

                    //do the update of the isLogIn propertie in database to TRUE, and send the token to the user
                    
                    const user_token = loginTokenGenerate(dbUser)
                    
                    Users.update({isLogIn:true},{where:{user_email: dbUser.user_email}})

                    .then(()=>{
                        const message = "user log in"
                        const token = {user_token}
                        res.json(generalResponseObj(token,message))
                    })

                    // //ERRORS IN THE UPDATE

                    
                    .catch(()=>{
                       
                        const error = "user status cant be cant be change"
                        
                        next(generalErrorFunc(error,500))
                    })
                }
                //ERRORS IN THE PASSWORD MATCHIN
                else{
                    const error = "incorrect password"
                    
                    next(generalErrorFunc(error,401))
                }

            });

        }
        else{
            //ERRORS IN THE FINDING OF THE USER
            const error = "no user found, you have to register first"
            next(generalErrorFunc(error,403))
        }
    })
    


    
    
}