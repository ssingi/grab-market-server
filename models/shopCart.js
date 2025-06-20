module.exports = (sequelize, DataTypes) => {
  const ShopCart = sequelize.define("ShopCart", {
    userID: { type: DataTypes.INTEGER, primaryKey: true, allowNull: false },
    productID: { type: DataTypes.INTEGER, primaryKey: true, allowNull: false },
    quantity: { type: DataTypes.INTEGER, defaultValue: 1, allowNull: false },
  });

  ShopCart.associate = (models) => {
    ShopCart.belongsTo(models.User, { foreignKey: "userID" });
    ShopCart.belongsTo(models.Product, { foreignKey: "productID" });
  };

  return ShopCart;
};
