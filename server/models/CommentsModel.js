import{ Sequelize } from 'sequelize'
import db from "../dbConfig.js"


const Comments = db.define("comments", {
  comment_id:{

    
    type:Sequelize.INTEGER,
    autoIncrement:true,

    
    allowNull:false,

    primaryKey:true
 },
    comment: {
      type: Sequelize.TEXT,
      allowNull: false
      
    },
    user_id:{

    
      type:Sequelize.INTEGER,
      allowNull:false,
  
      
   },
    
  });



  
export default Comments