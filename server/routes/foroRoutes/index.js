import express from "express"
import foro from "../../controls/foroControl/index.js"
const Route = express.Router()

//route for fetchin all the posts fo all the users for the main page
Route.get("/", )

//route for fetchin all the  posts from that user
Route.get("/userposts/:id", (req,res)=> res.send("welcome to the user foro "+ req.params.id))

//route for creating the post whit the user credentials
Route.post("/createpost", foro.createPost )

//route for creatin comment for a post
Route.post("/createcomment/post/:id", foro.createComments )

//route for fetchin the comments for a giving post
Route.get("/comments/post/:id", (req,res)=> res.send("welcome to the user foro "+ req.params.id))

//route for deleting a post, and the comments are deleted whit it.
Route.delete("/deletepost/:id", foro.deletePost)




export default Route