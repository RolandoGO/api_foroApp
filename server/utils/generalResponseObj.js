export default function generalResponseObj(data = [], msj = "no message"){

    const responseObj ={
        message:msj,
        data
    }


    return responseObj
}