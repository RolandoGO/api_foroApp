import Posts from "../../models/PostsModel.js"
import Comments from "../../models/CommentsModel.js"
import generalErrorFunc from "../../utils/generalErrorFunc.js"
import generalResponseObj from "../../utils/generalResponseObj.js"

//general msj for the error in all get request fails
const errorMsj = "error finding the data in the database"

const get_methods = {

    

    getAllPosts:(req,res,next)=>{

        Posts.findAll()
        .then(result=>{

            if(result.length > 0){
                const message = "this are all the posts"
                res.json(generalResponseObj(result, message))
            }
            else{
                const message = "no post found"
                res.json(generalResponseObj(result, message))
                

            }
        })
        .catch(()=>generalErrorFunc(errorMsj,500))



    },

    getUserPosts:(req,res,next)=>{

        const {id}=req.user

        Posts.findAll({where:{userUserId:id}})
        .then(result=>{

            if(result.length > 0){
                const message = "this are all your posts"
                res.json(generalResponseObj(result,message))
            }
            else{
                const message = "no post found"
                res.json(generalResponseObj(result,message))
                

            }
        })
        .catch(()=>generalErrorFunc(errorMsj,500))


    },

    getComments:(req,res,next)=>{

        const post_id = req.params.id

        

        Comments.findAll({where:{postPostId: post_id}})
        .then(result=>{

            if(result.length > 0){
                const message = "this are all the comments for this post"
                res.json(generalResponseObj(result,message))
            }
            else{
                const message = "no comments found"
                res.json(generalResponseObj(result, message))
                

            }
        })
        .catch(()=>generalErrorFunc(errorMsj,500))


    }

}

export default get_methods