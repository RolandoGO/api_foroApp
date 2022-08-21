import Posts from "../../models/PostsModel.js"
import Comments from "../../models/CommentsModel.js"

const post_delete_methods = {

    createPost:(req,res,next)=>{

        
        const {post} = req.body
        const { id} = req.user

        

        Posts.create({
            post,
            userUserId:id

        })
        .then(result=>res.json({data:post, message:"post created"}))
        .catch(()=>{
            
            const error = new Error("cant create post, something is wrong whit the database")
            error.status = 500
            next(error)
        })


    },

    deletePost:(req,res,next)=>{

        const {id}=req.params
        const current_user_id = req.user.id

        

        //find the post whit the post id, next check if that user_id in the post is the one in the token.
        
        Posts.findAll({where:{post_id:id}})
        .then(result=>{
            if(result.length>0){

                const post = result[0]

                if(post.userUserId == current_user_id ){

                    //is the same user, he/she can delete post
                    
                    Posts.destroy({where:{post_id: id}})
                    .then(result=>res.json({message:"post deleted", result}))
                    .catch(()=>{
                       
                        const error = new Error("post cant be deleted, error in the database")
                        error.status = 500
                        next(error)
                    })

                    
                }
                else{

                    //is not the owner of the post, son seh/he cant delete the post
                    const error = new Error("you are not authorize to delete this post")
                    error.status = 403
                    next(error)

                }

            }
            else{
                const error = new Error("post not found, error in id ")
            }
        })

        

    },


    createComments:(req,res,next)=>{

        const { id} = req.params
        const {comment} = req.body
        const user_id = req.user.id

        Posts.findAll({where:{post_id:id}})
        .then(result=>{
            const post = result[0]
            if(post){

                

                Comments.create({
                    postPostId:id,
                    user_id,
                    comment
                })
                .then(result=>{ res.json({message:"comment created", result})})
                .catch(()=>{
                   
                    const error = new Error("An error has occur in the database, comment cant be created")
                    error.status = 500
                    next(error)
                })



            }
            else{
                const error = new Error("post dosent exist")
                error.status = 400
                next(error)
            }
        })

        
    },
    

}

export default post_delete_methods

