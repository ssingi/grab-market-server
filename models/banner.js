module.exports = (sequelize, DataTypes) => {
  const Banner = sequelize.define("Banner", {
    imageUrl: {
      type: DataTypes.STRING(300),
      allowNull: false,
    },
    href: {
      type: DataTypes.STRING(200),
      allowNull: false,
    },
  });
  return Banner;
};
