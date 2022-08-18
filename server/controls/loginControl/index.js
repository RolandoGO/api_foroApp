import Users from "../../models/UserModel.js"
import bcryptjs from "bcryptjs"
import loginTokenGenerate from "../../utils/loginTokenGenerate.js"

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
                    Users.update({isLogIn:true},{where:{user_email: dbUser.user_email}})
                    .then(userUpdated=> res.json({message:"user Updated", token: loginTokenGenerate(dbUser)}))

                    //ERRORS IN THE UPDATE
                    .catch(err=>{
                        const error= new Error("user cant be updated")
                        error.status=500
                        next(error)
                    })
                }
                //ERRORS IN THE PASSWORD MATCHIN
                else{
                    res.json({message:"wrong password"})
                }

            });

        }
        else{
            //ERRORS IN THE FINDING OF THE USER
            const error = new Error("you have to register first")
            error.status=400
            next(error)
        }
    })
    


    
    
}