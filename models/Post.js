module.exports = (sequelize, DataTypes) => {
  const Post = sequelize.define(
    "Post",
    {
      postID: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      number: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      title: {
        type: DataTypes.STRING(200),
        allowNull: false,
      },
      content: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
      views: {
        type: DataTypes.INTEGER,
        defaultValue: 0,
      },
      productID: {
        type: DataTypes.INTEGER,
        allowNull: true,
        foreignKey: true,
      },
    },
    {
      timestamps: true, // createdAt, updatedAt 자동 생성
      tableName: "Posts",
    }
  );

  Post.associate = (models) => {
    Post.hasMany(models.PostLog, { foreignKey: "postID", onDelete: "CASCADE" });
    Post.hasMany(models.PostFile, {
      foreignKey: "postID",
      onDelete: "CASCADE",
    });
    Post.belongsTo(models.Product, {
      foreignKey: "productID",
      onDelete: "SET NULL",
    });
  };

  return Post;
};
