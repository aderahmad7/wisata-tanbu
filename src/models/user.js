import { DataTypes } from "sequelize";
import sequelize from "../configs/database.js";

const User = sequelize.define(
  "user",
  {
    username: { type: DataTypes.STRING, allowNull: false, primaryKey: true },
    password: { type: DataTypes.STRING, allowNull: false },
  },
  {
    timestamps: true,
  }
);

export default User;
