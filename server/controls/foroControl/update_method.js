import Posts from "../../models/PostsModel.js"
import Comments from "../../models/CommentsModel.js"

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
                    .then(result=>res.json({message:"post updated"}))
                    .catch(()=>{
                        const error = new Error("cant update, something went wrong")
                        error.status = 500
                        next(error)
                    })
                    
                }
                else{

                    //is not the owner of the post, son seh/he cant delete the post
                    const error = new Error("you are not authorize to update this post")
                    error.status = 403
                    next(error)

                }

            }
            else{
                const error = new Error("post not found, error in id ")
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
                    .then(result=>res.json({message:"comment updated"}))
                    .catch(()=>{
                        const error = new Error("cant update, something went wrong")
                        error.status = 500
                        next(error)
                    })
                    
                }
                else{

                    //is not the owner of the post, son seh/he cant delete the post
                    const error = new Error("you are not authorize to update this post")
                    error.status = 403
                    next(error)

                }

            }
            else{
                const error = new Error("comment not found, error in id ")
            }
        })



       

    


    }


}

export default update_method