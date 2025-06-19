module.exports = (sequelize, DataTypes) => {
  const PostLog = sequelize.define(
    "PostLog",
    {
      logID: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      postID: {
        type: DataTypes.INTEGER,
        foreignKey: true,
      },
      ip: {
        type: DataTypes.STRING(45), // IPv4 최대 길이
        allowNull: false,
      },
      userAgent: {
        type: DataTypes.STRING(255), // User-Agent 최대 길이
        allowNull: false,
      },
      timestamp: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
        allowNull: false,
      },
    },
    {
      timestamps: false,
      tableName: "PostLogs",
    }
  );

  PostLog.associate = (models) => {
    PostLog.belongsTo(models.Post, {
      foreignKey: "postID",
      onDelete: "CASCADE",
    });
  };

  return PostLog;
};
