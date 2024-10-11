import Sequelize from "sequelize";
import User from "../app/models/User";
import configDatabase from "../config/database";
import Product from "../app/models/Product";
import Category from "../app/models/Category";
import mongoose from "mongoose";

const models = [User, Product, Category];

class Database {
  constructor() {
    this.init();
    this.mongo();
  }

  init() {
    this.connection = new Sequelize("postgresql://postgres:KsWrWtCQjbhn5d06jbCk@containers-us-west-62.railway.app:5624/railway");
    models
      .map((model) => model.init(this.connection))
      .map(
        (model) => model.associate && model.associate(this.connection.models)
      );
  }
  mongo() {
    this.mongoConnection = mongoose.connect(
      "mongodb://mongo:y9TSX5e8dm6q6j9UMDYX@containers-us-west-113.railway.app:6901",
      {
        useNewUrlParser: true,
        useUnifiedTopology:true,
      }
    );
  }
}

export default new Database();