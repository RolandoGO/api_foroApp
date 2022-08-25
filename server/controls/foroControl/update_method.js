import Posts from "../../models/PostsModel.js"
import Comments from "../../models/CommentsModel.js"
import generalErrorFunc from "../../utils/generalErrorFunc.js"
import generalResponseObj from "../../utils/generalResponseObj.js"

const update_method = {

    post_update:(req,res,next)=>{

        const new_post= req.body.post
        const post_id = req.params.id
        const current_user_id = req.user.id

        Posts.findAll({where:{post_id}})
        .then(result=>{
            if(result.length>0){

                const post = result[0]

                if(post.userUserId == current_user_id ){

                    //is the same user, he/she can delete post
                    
                    Posts.update({post:new_post}, {where:{post_id}})
                    .then(result=>{
                        const message = "post updated"
                        res.json(generalResponseObj(result,message))
                    })
                    .catch(()=>{
                        const error = "cant update, something went wrong"
                        
                        next(generalErrorFunc(error,500))
                    })
                    
                }
                else{

                    //is not the owner of the post, son seh/he cant delete the post
                    const error = "you are not authorize to update this post"
                    
                    next(generalErrorFunc(error,403))

                }

            }
            else{
                const error = "post not found, error in id "
                next(generalErrorFunc(error,404))
            }
        })


    


    },

    comment_update: (req,res,next)=>{

        const new_comment =req.body.comment
        const comment_id = req.params.id
        const current_user_id = req.user.id


        Comments.findAll({where:{comment_id}})
        .then(result=>{
            if(result.length>0){

                const comment = result[0]

                

                if(comment.user_id == current_user_id ){

                    //is the same user, he/she can delete post
                    
                    Comments.update({comment:new_comment}, {where:{comment_id}})
                    .then(result=>{
                        
                        const message = "comment updated"
                        res.json(generalResponseObj(result,message))
                    })
                    .catch(()=>{
                        const error = "cant update, something went wrong in the database"
                        
                        next(generalErrorFunc(error,500))
                    })
                    
                }
                else{

                    //is not the owner of the post, son seh/he cant delete the post
                    const error = "you are not authorize to update this post"
                    
                    next(generalErrorFunc(error,403))

                }

            }
            else{
                const error = "comment not found, error in id "
                next(generalErrorFunc(error,404))
            }
        })



       

    


    }


}

export default update_method