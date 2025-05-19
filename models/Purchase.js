module.exports = (sequelize, DataTypes) => {
  const Purchase = sequelize.define("Purchase", {
    purchaseID: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    quantity: { type: DataTypes.INTEGER, defaultValue: 0 },
    purchaseDate: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW,
    },
    deliveryAddress: {
      type: DataTypes.STRING(500),
      allowNull: false,
    },
    userID: { type: DataTypes.INTEGER, allowNull: false },
    productID: { type: DataTypes.INTEGER, allowNull: false },
  });

  /*
  Purchase.associate = (models) => {
    Purchase.belongsTo(models.User, { foreignKey: "userID" });
    Purchase.belongsTo(models.Product, { foreignKey: "productID" });
  };
  */

  return Purchase;
};
