module.exports = (sequelize, DataTypes) => {
  const Product = sequelize.define("Product", {
    productID: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    name: {
      type: DataTypes.STRING(20),
      allowNull: false,
      unique: true,
    },
    price: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    seller: {
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
    },
  });

  Product.associate = (models) => {
    Product.belongsTo(models.User, { foreignKey: "seller" });
    Product.hasMany(models.Post, {
      foreignKey: "productID",
      onDelete: "SET NULL",
    });
  };

  return Product;
};
