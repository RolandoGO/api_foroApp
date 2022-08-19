import Posts from "../../models/PostsModel.js"
import Comments from "../../models/CommentsModel.js"
import get_methods_errorHandler from "../../utils/get_methods_errorHandler.js"

const get_methods = {

    

    getAllPosts:(req,res,next)=>{

        Posts.findAll()
        .then(result=>{

            if(result.length > 0){

                res.json({message:"this are all the posts", result })
            }
            else{

                res.json({message:"no post found"})
                

            }
        })
        .catch(()=>get_methods_errorHandler(next))



    },

    getUserPosts:(req,res,next)=>{

        const {id}=req.user

        Posts.findAll({where:{userUserId:id}})
        .then(result=>{

            if(result.length > 0){

                res.json({message:"this are all your posts", result })
            }
            else{

                res.json({message:"no post found"})
                

            }
        })
        .catch(()=>get_methods_errorHandler(next))


    },

    getComments:(req,res,next)=>{

        const post_id = req.params.id

        

        Comments.findAll({where:{postPostId: post_id}})
        .then(result=>{

            if(result.length > 0){

                res.json({message:"this are all the comments for this post", result })
            }
            else{

                res.json({message:"no comments found"})
                

            }
        })
        .catch(()=>get_methods_errorHandler(next))


    }

}

export default get_methods