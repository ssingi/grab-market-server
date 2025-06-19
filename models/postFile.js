module.exports = (sequelize, DataTypes) => {
  const PostFile = sequelize.define(
    "PostFile",
    {
      postID: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        foreignKey: true,
        allowNull: false,
      },
      fileUrl: {
        type: DataTypes.STRING(500),
        allowNull: false,
        primaryKey: true,
        validate: { isUrl: true },
      },
    },
    {
      timestamps: true,
      tableName: "PostFiles",
    }
  );

  PostFile.associate = (models) => {
    PostFile.belongsTo(models.Post, {
      foreignKey: "postID",
      onDelete: "CASCADE",
    });
  };

  return PostFile;
};
