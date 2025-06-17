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
    isActive: {
      type: DataTypes.BOOLEAN,
      defaultValue: true,
    },
    failedLoginAttempts: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
    },
    lastLoginAttempt: {
      type: DataTypes.DATE,
      allowNull: true,
    },
    ipAddress: {
      type: DataTypes.STRING(45),
      allowNull: true,
    },
  });

  User.associate = (models) => {
    User.hasMany(models.Blog, {
      foreignKey: "userID",
      onDelete: "SET NULL",
      hooks: true,
    });
    User.hasMany(models.Product, {
      foreignKey: "seller",
      onDelete: "CASCADE", // 유저 삭제 시 Product도 같이 삭제
      hooks: true,
    });
    User.hasMany(models.Purchase, {
      foreignKey: "userID",
      onDelete: "CASCADE",
      hooks: true,
    });
  };

  return User;
};
