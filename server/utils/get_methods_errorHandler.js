export default function get_methods_errorHandler(next){

    const error = new Error("error fetchin the data requested")
    error.status = 500
    next(error)

}