'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class user extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
  // define association here
   //hasMany to product model
   user.hasMany(models.product, {
    as: "products",
    foreignKey: {
      name: "idUser",
    },
  });
    }
  };
  user.init({
    fullName: DataTypes.STRING,
    email: DataTypes.STRING,
    password: DataTypes.STRING,
    image: DataTypes.STRING,
    listAs: DataTypes.INTEGER,
  }, {
    sequelize,
    modelName: 'user',
  });
  return user;
};