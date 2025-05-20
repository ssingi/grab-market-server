module.exports = (sequelize, DataTypes) => {
  const Post = sequelize.define("Blog", {
    postID: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
    },
    title: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },
    imageUrl: {
      type: DataTypes.STRING(300),
      allowNull: true,
      validate: { isUrl: true },
    },
    uploadTime: {
      type: DataTypes.DATE,
    },
    productID: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    userID: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    postAt: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW,
    },
  });

  Post.associate = (models) => {
    Post.belongsTo(models.User, { foreignKey: "userID" });
  };

  return Post;
};
