const express = require("express");
const router = express.Router();
const Sequelize = require("sequelize");


// const sequelize = new Sequelize('mysql://root:13061992@localhost:3002/partylux')
const sequelize = new Sequelize(process.env.CLEARDB_DATABASE_URL || "mysql://root:12345678@localhost/partylux");

module.exports = router
