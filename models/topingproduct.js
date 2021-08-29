'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class topingProduct extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      topingProduct.belongsTo(models.toping, {
        as: "toping", 
        foreignKey: {
          name: "idToping",
        },
      });

      topingProduct.belongsTo(models.order, {
        as: "order", 
        foreignKey: {
          name: "idOrder",
        },
      });
    }
  };
  topingProduct.init({
    idToping: DataTypes.INTEGER,
    idOrder: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'topingProduct',
  });
  return topingProduct;
};