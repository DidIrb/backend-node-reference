import dotenv from "dotenv";
dotenv.config();

import Sequelize, { DataTypes } from "sequelize";

// Importing Models
import BirthCertificate from "../models/birth.cert.model.js";
import Person from "../models/person.model.js";

const env = process.env;

const sequelize = new Sequelize(env.DB, env.DB_USER, env.DB_PASSWORD, {
  host: env.DB_HOST,
  dialect: env.DIALECT,
});

export const db = {
  conn: sequelize,
  Sequelize: Sequelize,
};

// This returns the model
export const models = {
  birthCert: BirthCertificate(),
  person: Person(),
};

// ONE TO ONE RELATIONSHIPS
// parent.hasOne(child)
// We are provided with 3 helper methods set,get,create child.
models.person.hasOne(models.birthCert, { foreignKey: {
  name: "owners_id" ,
  type: DataTypes.INTEGER,
  unique: true
}});

// belongsTo defines the one to one relationship birthCertificates belong to persons
// child.belongsTo(parent) 
// helper methods set,get,create are added similar to the hasOne helper methods
models.birthCert.belongsTo(models.person, { onDelete: "CASCADE" })

// You can customize it further by specifying what to do when an action like update or delete is done

const connectDB = async () => {
  try {
    await sequelize.authenticate();
    console.log("Connection has been established successfully.");
  } catch (err) {
    console.error("Unable to connect to the database:", err);
  }
};

export default connectDB;
