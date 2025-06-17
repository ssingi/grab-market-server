module.exports = (sequelize, DataTypes) => {
  const Blog = sequelize.define("Blog", {
    postID: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    number: {
      type: DataTypes.INTEGER,
      allowNull: false,
      unique: true,
    },
    title: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },
    content: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    fileUrl: {
      type: DataTypes.JSON, // 여러 파일 URL 저장
      allowNull: true,
    },
    views: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
    },
    viewLogs: {
      type: DataTypes.JSON, // [{ip, userAgent, timestamp}]
      allowNull: true,
    },
    createdAt: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
    },
    updatedAt: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
    },
  });

  Blog.associate = (models) => {
    Blog.belongsTo(models.User, { foreignKey: "userID" });
  };

  return Blog;
};
