const { CURRENCY } = require('../constants');

module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define(
    'User',
    {
      firstName: {
        type: DataTypes.STRING,
        allowNull: false
      },
      lastName: {
        type: DataTypes.STRING,
        allowNull: false
      },
      userName: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false
      },
      currency: {
        type: DataTypes.ENUM,
        values: CURRENCY,
        allowNull: false
      }
    },
    {
      underscored: true,
      tableName: 'users'
    }
  );
  User.associate = models => User.hasMany(models.CryptoCoin);
  return User;
};
