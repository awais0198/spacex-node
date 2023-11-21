const { makeModel } = require('./model');

exports.init = (sequelize, DataTypes) => makeModel(sequelize, DataTypes);
