
import generalErrorFunc from "../../utils/generalErrorFunc.js"


export default function post_comments_valid(req,res,next){


    const data = req.body
    

    if(data){

        if(data.post){
            
                const post = data.post.toString()
            if(post.length > 1){

                
                next()
            }
            else{

                const error = "write something LARGER"
                
                next(generalErrorFunc(error,400))

            }

        }
        else if( data.comment){

            const comment = data.comment.toString()

            if(comment.length > 0) next()
            else{

                const error = "cant be empty, write something"
                
                next(generalErrorFunc(error,400))

            }


        }
        else{

            const error = "cant be empty, write something"
            
            next(generalErrorFunc(error,400))

        }

    }

    else{
        const error = "there is no data in the request body"
        
        next(generalErrorFunc(error,400))
    }


}