'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class product extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      product.belongsTo(models.user, {
        as: "user",
        foreignKey: {
          name: "idUser",
        },
      });
      product.hasMany(models.order, {
        as: "order",
        foreignKey: {
          name: "idProduct",
        },
      });

        // belongs to many toping
        product.belongsToMany(models.toping, {
          as: "toping",
          through: {
            model: "producttoping",
            as: "bridge",
          },
          foreignKey: "idProduct",
        });
    }
  };
  product.init({
    title: DataTypes.STRING,
    price: DataTypes.INTEGER,
    image: DataTypes.STRING,
    idUser: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'product',
  });
  return product;
};