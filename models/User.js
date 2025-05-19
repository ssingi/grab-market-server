module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define("User", {
    userID: {
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
      // unique: true,
      validate: {
        isEmail: true,
        notEmpty: true,
        len: [5, 50],
      },
    },
    userName: {
      type: DataTypes.STRING(30),
      allowNull: true,
    },
    userAddress: {
      type: DataTypes.STRING(500),
      allowNull: true,
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
    lastLogin: { type: DataTypes.DATE },
  });

  /*
  User.associate = (models) => {
    User.hasMany(models.Blog, { foreignKey: "userID" });
    User.hasMany(models.Product, { foreignKey: "seller" });
  };
  */

  return User;
};
