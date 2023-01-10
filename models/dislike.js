'use strict';
module.exports = (sequelize, DataTypes) => {
  var disLike = sequelize.define('disLike', {
    messageId: {
      type: DataTypes.INTEGER,
      references: {
        model: 'Message',
        key: 'id'
      }
    },
    userId: {
      type: DataTypes.INTEGER,
      references: {
        model: 'User',
        key: 'id'
      }
    }
  }, {});
  disLike.associate = function(models) {
    // associations can be defined here

    models.User.belongsToMany(models.Message, {
      through: models.disLike,
      foreignKey: 'userId',
      otherKey: 'messageId',
    });

    models.Message.belongsToMany(models.User, {
      through: models.disLike,
      foreignKey: 'messageId',
      otherKey: 'userId',
    });

    models.disLike.belongsTo(models.User, {
      foreignKey: 'userId',
      as: 'user',
    });

    models.disLike.belongsTo(models.Message, {
      foreignKey: 'messageId',
      as: 'message',
    });
  };
  return disLike;
};