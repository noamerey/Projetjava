'use strict';
module.exports = (sequelize, DataTypes) => {
  var Message = sequelize.define('Resserche', {
    UserId:DataTypes.INTEGER,
    RsId:DataTypes.INTEGER,  
    
    
  }, {
    classMethods: {
      associate: function(models) {
        
        
        models.Reserche.belongsTo(models.User, {
          foreignKey: {
            allowNull: false
          }
        })
      }
    }
  });
  return Reserche;
};
