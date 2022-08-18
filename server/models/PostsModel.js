import{ Sequelize } from 'sequelize'
import db from "../dbConfig.js"
import Comments from './CommentsModel.js';

const Posts = db.define("posts", {
  post_id:{

    
    type:Sequelize.INTEGER,
    autoIncrement:true,

    
    allowNull:false,

    primaryKey:true
 },
    post: {
      type: Sequelize.TEXT,
      allowNull: false
      
    }
    
  });

  Posts.hasMany(Comments,
    {
      onDelete: 'cascade',
      foreignKey: { allowNull: false },
      hooks: true 
       
    })
  // Comments.hasOne(Posts,
  //   {
  //     onDelete: 'cascade',
  //     foreignKey: { allowNull: false },
  //     hooks: true 
       
  //   })

  
export default Posts