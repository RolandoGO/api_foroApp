export default function post_comments_valid(req,res,next){


    const data = req.body
    

    if(data){

        if(data.post){

            if(data.post.length > 1)next()
            else{

                const error = new Error("write something LARGER")
                error.status = 400
                next(error)

            }

        }
        else if( data.comment){

            if(data.comment.length > 0)next()
            else{

                const error = new Error("cant be empty, write something")
                error.status = 400
                next(error)

            }


        }
        else{

            const error = new Error("cant be empty, write something")
            error.status = 400
            next(error)

        }

    }

    else{
        const error = new Error("there is no data in the request body")
        error.status = 400
        next(error)
    }


}