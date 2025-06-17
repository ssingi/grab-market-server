module.exports = (sequelize, DataTypes) => {
  const Contact = sequelize.define("Contact", {
    contactID: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    name: { type: DataTypes.STRING(50), allowNull: false },
    email: { type: DataTypes.STRING(100), allowNull: false },
    phone: { type: DataTypes.STRING(30), allowNull: false },
    message: { type: DataTypes.STRING(1000), allowNull: false },
    status: {
      type: DataTypes.ENUM("in progress", "pending", "completed"),
      defaultValue: "in progress",
    },
    createdAt: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
    },
  });
  return Contact;
};
