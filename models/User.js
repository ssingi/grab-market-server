const { ForeignKeyConstraintError } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define("User", {
    userID: {
      // 변경된 속성 이름
      type: DataTypes.STRING(30),
      allowNull: false,
      primaryKey: true,
    },
    password: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING(50),
      allowNull: false,
      unique: true,
      validate: {
        isEmail: true,
        notEmpty: true,
        len: [5, 50],
      },
    },
    createdAt: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW,
    },
    isLoggedIn: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
    lastLogin: {
      type: DataTypes.DATE,
    },
  });

  User.associate = (models) => {
    User.hasMany(models.Post, { foreignKey: "userID" });
  };

  User.associate = (models) => {
    User.hasMany(models.products, { foreignKey: "sellerID" });
  };

  return User;
};
