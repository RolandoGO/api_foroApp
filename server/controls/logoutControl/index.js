import Users from "../../models/UserModel.js"


//function for updateing the isLogIn propetie to false acording to the token info in the request

export default function logoutControl(req,res,next){

   const {id,email} = req.user

   Users.update({isLogIn:false}, {where:{user_id: id}})

   .then(result=>res.json({result, message:"user log out"}))

   .catch(()=>{
    const err = new Error("cant log out the user, there is a problem whit the database")
    err.status=500
    next(err)
   })

}