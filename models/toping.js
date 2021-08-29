'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class toping extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      toping.belongsTo(models.user, {
        as: "user",
        foreignKey: {
          name: "idUser",
        },
      });
      toping.hasMany(models.topingProduct, {
        as: "topingProduct",
        foreignKey: {
          name: "idToping",
        },
      });



      
       // belongs to many products
      //  toping.belongsToMany(models.product, {
      //   as: "product",
      //   through: {
      //     model: "producttoping",
      //     as: "bridge",
      //   },
      //   foreignKey: "idToping",
      // });

    }
  };
  toping.init({
    title: DataTypes.STRING,
    price: DataTypes.INTEGER,
    image: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'toping',
  });
  return toping;
};