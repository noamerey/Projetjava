'use strict';
module.exports = (sequelize, DataTypes) => {
  var Message = sequelize.define('Message', {
    UserId:DataTypes.INTEGER,
    blaze: DataTypes.STRING,
    content: DataTypes.STRING,  
    attachment: DataTypes.STRING,
    likes: DataTypes.INTEGER,
    dislikes: DataTypes.INTEGER,
    
  }, {
    classMethods: {
      associate: function(models) {
        
        
        models.Message.belongsTo(models.User, {
          foreignKey: {
            allowNull: false
          }
        })
      }
    }
  });
  return Message;
};