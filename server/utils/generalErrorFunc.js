const generalErrorFunc = (errMsj, statusErr)=>{

    const error = new Error(errMsj)
    error.status = statusErr
    return error

}

export default generalErrorFunc