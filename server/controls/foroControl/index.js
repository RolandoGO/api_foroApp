import Posts from "../../models/PostsModel.js"
import Comments from "../../models/CommentsModel.js"

const foro = {

    createPost:(req,res,next)=>{

        
        const {post} = req.body
        const { id, email} = req.user

        

        Posts.create({
            post,
            userUserId:id

        })
        .then(result=>res.json({email:email, data:post, message:"post created"}))
        .catch(()=>{
            
            const error = new Error("cant create post, something is wrong whit the database")
            error.status = 500
            next(error)
        })


    },

    createComments:(req,res,next)=>{

        const { id} = req.params
        const {comment} = req.body

        Comments.create({
            postPostId:id,
            comment
        })
        .then(result=>{ res.json({message:"comment created", result})})
        .catch(()=>{
            const error = new Error("database error, comment cant be created")
            error.status = 500
            next(error)
        })



    },



    
}

export default foro