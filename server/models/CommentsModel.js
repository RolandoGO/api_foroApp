import{ Sequelize } from 'sequelize'
import db from "../dbConfig.js"


const Comments = db.define("commetns", {
  comment_id:{

    
    type:Sequelize.INTEGER,
    autoIncrement:true,

    
    allowNull:false,

    primaryKey:true
 },
    comment: {
      type: Sequelize.TEXT,
      allowNull: false
      
    }
    
  });



  
export default Comments