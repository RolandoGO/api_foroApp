import express from "express"
import post_delete_methods from "../../controls/foroControl/post_delete_methods.js"
import get_methods from "../../controls/foroControl/get_methods.js"
import update_method from "../../controls/foroControl/update_method.js"
import post_comments_valid from "../../middlewares/post_comments_valid/index.js"

const Route = express.Router()

//route for fetchin all the posts fo all the users for the main page
Route.get("/", get_methods.getAllPosts)

//route for fetchin all the  posts from that user
Route.get("/userposts", get_methods.getUserPosts)

//route for fetchin the comments for a giving post
Route.get("/comments/post/:id", get_methods.getComments)

//route for creating the post whit the user credentials
Route.post("/createpost", post_comments_valid, post_delete_methods.createPost )

//route for creatin comment for a post
Route.post("/createcomment/post/:id", post_comments_valid, post_delete_methods.createComments )



//route for deleting a post, and the comments are deleted whit it.
Route.delete("/deletepost/:id", post_delete_methods.deletePost)

Route.put("/updatepost/:id", post_comments_valid, update_method.post_update)

Route.put("/updatecomment/:id", post_comments_valid, update_method.comment_update)






export default Route