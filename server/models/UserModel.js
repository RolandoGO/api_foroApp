import{ Sequelize } from 'sequelize'
import db from "../dbConfig.js"
import Posts from './PostsModel.js'


const Users = db.define("users", {
  user_id:{
    
    type:Sequelize.INTEGER,
    autoIncrement:true,
    allowNull:false,
    primaryKey:true
 },
    user_name: {
      type: Sequelize.STRING(100),
      allowNull: false
      
    },
    user_last_name: {
        type: Sequelize.STRING(100),
        allowNull: false
       
      },
    user_email: {
        type: Sequelize.STRING(255),
        allowNull: false,
        unique: true,
        validate:{
            isEmail:true
        }
      },
    hashedPassword: {
      type: Sequelize.STRING(255),
      allowNull: false
    },
    isLogIn:{
      type: Sequelize.BOOLEAN,
      defaultValue:false,
      allowNull:false
    }
    
    
  },
  {
    timestamps: false
  });

  //realtions bettewn tables-------
  
  Users.hasMany(Posts,
    {
      onDelete: 'cascade',
      foreignKey: { allowNull: false },
      hooks: true 
       
    })
  Posts.belongsTo(Users,
    {
      onDelete: 'cascade',
      foreignKey: { allowNull: false },
      hooks: true 
       
    })

    

export default Users