import { DataTypes } from "sequelize";
import sequelize from "../configs/database.js";

const Destination = sequelize.define(
  "destination",
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    subdistrict: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    photo_url: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    place_name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    location: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    latitude: {
      type: DataTypes.STRING, // 10 total digits, 8 di antaranya untuk desimal
      allowNull: false,
    },
    longitude: {
      type: DataTypes.DECIMAL(11, 8), // 11 total digits, 8 di antaranya untuk desimal
      allowNull: false,
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    ctr: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0,
    },
  },
  {
    timestamps: true,
  }
);

export default Destination;
