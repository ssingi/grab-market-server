module.exports = function (sequelize, DataTypes) {
  const product = sequelize.define("Product", {
    productID: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING(20),
      allowNull: false,
      unique: true,
    },
    price: {
      type: DataTypes.INTEGER(10),
      allowNull: false,
    },
    sellerID: {
      type: DataTypes.STRING(30),
      allowNull: false,
    },
    description: {
      type: DataTypes.STRING(300),
      allowNull: false,
    },
    quantity: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0,
      validate: {
        min: 0,
        isInt: true,
      },
    },
    imageUrl: {
      type: DataTypes.STRING(300),
      allowNull: true,
      validate: {
        isUrl: true,
      },
    },
  });

  product.associate = (models) => {
    product.belongsTo(models.User, { foreignKey: "sellerID" });
  };

  return product;
};
