import Users from "../../models/UserModel.js"
import generalErrorFunc from "../../utils/generalErrorFunc.js"
import generalResponseObj from "../../utils/generalResponseObj.js"

//function for updateing the isLogIn propetie to false acording to the token info in the request

export default function logoutControl(req,res,next){

   const {id,email} = req.user

   Users.update({isLogIn:false}, {where:{user_id: id}})

   .then(result=>{
      const message = "user log out"
      res.json(generalResponseObj(result,message))
   })

   .catch(()=>{
    const err = "cant log out the user, there is a problem whit the database"
    
    next(generalErrorFunc(err,500))
   })

}