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
      type: DataTypes.STRING(45), // IPv6까지 고려
      allowNull: true,
    },
    // createdAt은 이미 위에 선언되어 있음
    // timestamps: true 옵션으로 updatedAt도 자동 생성됨
    // username은 userID와 userName으로 대체
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
  };

  return User;
};
