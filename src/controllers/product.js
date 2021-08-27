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

exports.addProduct = async (req, res) => {
  // const path = process.env.PATH_FILE

  try {
    const { idUser } = req
    console.log(idUser)

    let data = req.body
    const image = req.files.imageFile[0].filename
    
    data = {
      ...data,
      image,
  }

    const products = await product.create({
      ...req.body,image
    });

    const productDataStored = await product.findOne({
      where: {
        title: req.body.title
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
