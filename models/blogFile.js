module.exports = (sequelize, DataTypes) => {
  const blogFile = sequelize.define("blogFile", {
    postID: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
    },
    fileUrl: {
      type: DataTypes.STRING(255),
      allowNull: false,
      primaryKey: true,
    },
  });

  blogFile.associate = (models) => {
    blogFile.belongsTo(models.blog, {
      foreignKey: "postID",
      onDelete: "CASCADE",
      hooks: true,
    });
  };

  return blogFile;
};
