import cors from "cors"

const secureUrls = ["http://localhost:3000"]
const  corsOptions = {
    origin: function (origin, callback) {
      
        if(secureUrls.indexOf(origin) != -1){
            callback(null,true)
        }
        else{
            callback( new Error("Not allowed by CORS"))
        }
      
    }
  }
export default cors(corsOptions)