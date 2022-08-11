import Users from "../../models/UserModel.js"



// function for controling the insert of the user, passes the error of the database to the next middleware if there is anny

export default function registerControl(req,res,next){


    const {name, email, last_name,password} = req.body

    Users.create({
        user_name:name,
        user_last_name:last_name,
        user_email:email,
        hashedPassword:password
    })
    .then(result=>{res.json({message:"user created"})})
    .catch(error=>next(error))

    

    

}