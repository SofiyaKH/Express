const sequelize = require("../DB");
const { DataTypes } = require("sequelize");

const Note = sequelize.define(
  "Note",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    text: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    tableName: "notes",
    timestamps: false,
  }
);

module.exports = Note;
