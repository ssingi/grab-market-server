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

    // --- User1.js에서 추가된 필드 ---
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
    User.hasMany(models.Post, {
      foreignKey: "userID",
      onDelete: "SET NULL",
      hooks: true,
    });
    User.hasMany(models.Product, {
      foreignKey: "seller",
      onDelete: "CASCADE",
      hooks: true,
    });
    User.hasMany(models.Purchase, {
      foreignKey: "userID",
      onDelete: "CASCADE",
      hooks: true,
    });
    User.hasMany(models.ShopCart, {
      foreignKey: "userID",
      onDelete: "CASCADE",
      hooks: true,
    });
  };

  return User;
};
