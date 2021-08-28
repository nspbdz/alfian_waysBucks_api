const { product } = require("../../models");


exports.getProducts = async (req, res) => {
  const path = process.env.PATH_FILE

  try {
    let products = await product.findAll({
    
      attributes: {
        exclude: [ "idUser" ,"createdAt", "updatedAt"],
      },
    });

    products = JSON.parse(JSON.stringify(products));
    products = products.map(product => {
      return {
        ...product,
        image: product.image ? path + product.image : null
      }
    })

    res.send({
      status: "success...",
      data: products
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
  const path = process.env.PATH_FILE

  try {
    const { id } = req.params;
    let products = await product.findOne({
      where: {
        id,
      },
      attributes: {
        exclude: [ "idUser" ,"createdAt", "updatedAt"],
      },
    });
    products = JSON.parse(JSON.stringify(products));

    res.send({
      status: "success...",
      data: {
        ...products,
        image: path + products.image,
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
  const path = process.env.PATH_FILE

  try {
    const {...data } = req.body;
    const idUser = req.user.id
    console.log(idUser)
    console.log("idUser",req.user.id)
    
    // console.log("request file", req.file);
    const newProduct = await product.create({
      ...data,
      image: req.file.filename,
      idUser: idUser
    });


    let productData = await product.findOne({
      where: {
        id: newProduct.id
      },
      attributes: {
        exclude: [ "idUser" ,"createdAt", "updatedAt"],
      },
      
    });
    productData = JSON.parse(JSON.stringify(productData));

    res.send({
      status: "success...",
      data: {
        ...productData,
        image: path + productData.image,
      },
    });
    res.send({
      status: "success",
      message: "resource has successfully created",
      data: productData
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({

      status: "failed",
      message: "internal server error",
    });
  }
};



exports.updateProduct = async (req, res) => {
  const path = process.env.PATH_FILE

  try {
    let data = req.body
    const { id } = req.params;
    const idUser = req.user.id
    const image = req.file.filename
    // console.log(id)
    // console.log("image",image)
    data = {
      ...data,
      image
  }
  console.log(data)

    await product.update(data, {
          where: {
            id,
      },
    });
    let products = await product.findOne({
      where: {
        id,
      },
      attributes: {
        exclude: ["idUser" , "createdAt", "updatedAt"],
      },
    });
    products = JSON.parse(JSON.stringify(products));

    res.send({
      status: "success...",
      data: {
        ...products,
        image: path + products.image,
      },
    });
   
  } catch (error) {
    // console.log(error)
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
    let productDelete = await product.findOne({
      where: {
        id,
      },
    });
    res.send({
      status: "success",
      message: `Delete product id: ${id} finished`,
      // data:productDelete
    });
  } catch (error) {
    console.log(error);
    res.send({
      status: "failed",
      message: "Server Error",
    });
  }
};