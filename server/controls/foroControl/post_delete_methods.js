import Posts from "../../models/PostsModel.js"
import Comments from "../../models/CommentsModel.js"
import generalErrorFunc from "../../utils/generalErrorFunc.js"
import generalResponseObj from "../../utils/generalResponseObj.js"

const post_delete_methods = {

    createPost:(req,res,next)=>{

        
        const {post} = req.body
        const { id} = req.user

        

        Posts.create({
            post,
            userUserId:id

        })
        .then(result=>{
            const message = "post created"
            res.json(generalResponseObj(result, message))
        
        })
        .catch(()=>{
            
            const error = "cant create post, something is wrong whit the database"
            
            next(generalErrorFunc(error,500))
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
                    .then(result=>{
                        const message = "post deleted"
                        res.json(generalResponseObj(result,message))
                    })
                    .catch(()=>{
                       
                        const error = "post cant be deleted, error in the database"
                        
                        next(generalErrorFunc(error,500))
                    })

                    
                }
                else{

                    //is not the owner of the post, son seh/he cant delete the post
                    const error = "you are not authorize to delete this post"
                    
                    next(generalErrorFunc(error,403))

                }

            }
            else{
                const error = "post not found, error in id "
                next(generalErrorFunc(error,404))
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
                .then(result=>{
                    const message = "comment created" 
                    res.json(generalResponseObj(result,message))
                
                })
                .catch(()=>{
                   
                    const error = "An error has occur in the database, comment cant be created"
                    
                    next(generalErrorFunc(error,500))
                })



            }
            else{
                const error = "post dosent exist"
                
                next(generalErrorFunc(error,400))
            }
        })

        
    },
    

}

export default post_delete_methods

