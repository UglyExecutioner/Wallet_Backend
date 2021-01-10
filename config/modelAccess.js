const filesystem = require('fs');
const DataTypes = require('sequelize');
const sequelize = require('./connection');
const Op = DataTypes.Op;
let path = require("path");
let ext = '.js'

let filePath = path.join(__dirname, "../models");

let modules = {};

filesystem.readdirSync(filePath).forEach((file) => {
    newPath = path.basename(file,ext);
    modules[newPath.toUpperCase()] = require(filePath + '/' + newPath)(sequelize,{DataTypes:DataTypes,Op:Op});
});


module.exports = modules;
