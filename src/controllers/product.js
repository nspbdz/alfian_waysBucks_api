const { product } = require("../../models");


exports.getProducts = async (req, res) => {
  try {
    const products = await product.findAll({
    
      attributes: {
        exclude: [ "createdAt", "updatedAt"],
      },
    });

    res.send({
      status: "success",
      data: {
        products,
      },
    });
  } catch (error) {
    console.log(error);
    res.send({
      status: "failed",
      message: "Server Error",
    });
  }
};

exports.getDetailProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const products = await product.findOne({
      where: {
        id,
      },
      attributes: {
        exclude: [ "createdAt", "updatedAt"],
      },
    });

    res.send({
      status: "success",
      data: {
        products,
      },
    });
  } catch (error) {
    console.log(error);
    res.send({
      status: "failed",
      message: "Server Error",
    });
  }
};

exports.createProduct = async (req, res) => {
  // const path = process.env.PATH_FILE

  try {
    let data = req.body
    const photo = req.files.imageFile[0].filename
 
    data = {
      ...data,
      photo,
  }

    const products = await product.create({
      ...req.body,photo
    });

    const productDataStored = await product.findOne({
      where: {
        name: req.body.name
      },
      
    });


    res.send({
      status: "success",
      message: "resource has successfully created",
      data: productDataStored
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({

      status: "failed",
      message: "internal server error",
    });
  }
};


exports.deleteProduct = async (req, res) => {
  try {
    const { id } = req.params;

    await product.destroy({  
      where: {
        id,
      },
    });

    res.send({
      status: "success",
      message: `Delete product id: ${id} finished`,
    });
  } catch (error) {
    console.log(error);
    res.send({
      status: "failed",
      message: "Server Error",
    });
  }
};
