const { transaction, order, product, toping,topingProduct, user } = require("../../models");

exports.addTransaction = async (req, res) => {
  const path = process.env.PATH_FILE

  try {
    const { toping: topingTitle, ...data } = req.body;
    //   const { ...data } = req.body;
    const idUser = req.user.id
    console.log(idUser)
    console.log(data)
    console.log("data", data.products)
    // console.log("idUser",req.user.id)

    const newTransaction = await transaction.create({
      idUser: idUser
    });

  
    data.products.map(async(item)=>{
      const{id,qty}=item;
      console.log(id,qty)
    {item.topings.map(async(items)=>{
      console.log("items",items)
        const orders=  await topingProduct.create({
      idProduct:id,
      idToping:items,
    })
    })}

    const orders=  await order.create({
      idProduct:id,
      idTransaction:newTransaction.id,
      qty:qty
    })
  })
    res.send({
      status: "success",
      message: "resource has successfully created",
      // data: topingData
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({

      status: "failed",
      message: "internal server error",
    });
  }
};


exports.getTransactions = async (req, res) => {
  try {
    const transactions = await transaction.findAll({

      include: [
        {
          model: user,
          as: "user",
          attributes: {
            exclude: ["createdAt", "updatedAt", "idUser","password"],
          },
        },
        {
          model: order,
          as: "order",
          attributes: {
            exclude: ["id",  "idTransaction", "createdAt", "updatedAt", "idUser"],
          },
          include: [
            {
            model: product,
            as: "product",
            attributes: {
              exclude: ["id","idProduct", "createdAt", "updatedAt"],
            },
            include:[
              {
                model: toping,
                  as: "toping",
                  through: {
                    model: topingProduct,
                    as: "bridge",
                    attributes: [],
                  },
                  attributes: {
                    exclude: [ "createdAt", "updatedAt"],
                  },
                }
            ]
          },
        ],
        },
      ],

      attributes: {
        exclude: ["password", "createdAt", "updatedAt"],
      },
    });

    res.send({
      status: "success",
      data: {
        transactions,
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