module.exports = (sequelize, DataTypes) => {
  const CryptoCoin = sequelize.define(
    'CryptoCoin',
    {
      currency: {
        type: DataTypes.STRING,
        allowNull: false
      },
      userId: {
        type: DataTypes.INTEGER,
        allowNull: false
      }
    },
    {
      underscored: true,
      tableName: 'crypto_coins'
    }
  );
  CryptoCoin.associate = models => CryptoCoin.hasMany(models.User, { foreignKey: 'userId' });
  return CryptoCoin;
};
