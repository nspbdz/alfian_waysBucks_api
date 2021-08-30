const { transaction, order, product, toping, topingProduct, user } = require("../../models");

exports.addTransaction = async (req, res) => {
  const path = process.env.PATH_FILE

  try {
    const { toping: topingTitle, ...data } = req.body;
    //   const { ...data } = req.body;
    const idUser = req.user.id
    console.log(idUser)
    console.log(data)
    console.log("data", data.products)
    console.log("idUser", req.user.id)

    const newTransaction = await transaction.create({
      idUser: idUser,
      status: "success",

    });


    data.products.map(async (item) => {
      const { id, qty } = item;
      console.log(id, qty)
      const newOrders = await order.create({
        idProduct: id,
        idTransaction: newTransaction.id,
        qty: qty
      })

      {
        item.topings.map(async (items) => {
          console.log("items", items)
          const newTopingproduct = await topingProduct.create({
            idOrder: newOrders.id,
            idToping: items,
          })
        })
      }


    })

    let transactions = await transaction.findOne({
      where: {
        id: 7
      },

      include: [
        {
          model: user,
          as: "user",
          attributes: {
            exclude: ["image", "listAs", "createdAt", "updatedAt", "idUser", "password"],
          },
        },
        {
          model: order,
          as: "order",
          attributes: {
            exclude: ["idTransaction", "idProduct", "createdAt", "updatedAt", "idUser"],
          },
          include: [
            {
              model: product,
              as: "product",
              attributes: {
                exclude: ["id", "idProduct", "idUser", "createdAt", "updatedAt"],
              },
            },

            {
              model: topingProduct,
              as: "topingProduct",
              attributes: {
                exclude: ["idProduct", "createdAt", "idToping", "idOrder", "updatedAt"],
              },
              include: [
                {
                  model: toping,
                  as: "toping",
                  attributes: {
                    exclude: ["image", "price", "idUser", "idToping", "idOrder", "createdAt", "updatedAt"],
                  },
                }
              ]
            },
          ],
        },
      ],
      attributes: {
        exclude: ["idUser", "createdAt", "updatedAt"],
      },
    });
    res.send({
      status: "success",
      message: "resource has successfully created",
      data: transactions
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
  const path = process.env.PATH_FILE

  try {
    let transactions = await transaction.findAll({

      include: [
        {
          model: user,
          as: "user",
          attributes: {
            exclude: ["image", "listAs", "createdAt", "updatedAt", "idUser", "password"],
          },
        },
        {
          model: order,
          as: "order",
          attributes: {
            exclude: ["idTransaction", "idProduct", "createdAt", "updatedAt", "idUser"],
          },
          include: [
            {
              model: product,
              as: "product",
              attributes: {
                exclude: ["id", "idProduct", "createdAt", "updatedAt"],
              },
            },

            {
              model: topingProduct,
              as: "topingProduct",
              attributes: {
                exclude: ["idProduct", "createdAt", "idToping", "idOrder", "updatedAt"],
              },
              include: [
                {
                  model: toping,
                  as: "toping",
                  attributes: {
                    exclude: ["image", "price", "idUser", "idToping", "idOrder", "createdAt", "updatedAt"],
                  },
                }
              ]
            },
          ],
        },
      ],
      attributes: {
        exclude: ["idUser", "password", "createdAt", "updatedAt"],
      },
    });
    transactions = JSON.parse(JSON.stringify(transactions))

    transactions = transactions.map((transaction) => {
      transaction = {
        ...transaction,
        attachment: transaction.attachment ? path + transaction.attachment : null,
        // photo: transaction.order.product.photo ? path + transaction.order.product.photo : null,

        userOrder: transaction.order.map((orders) => {
          orders = {
            ...orders,
            product: {
              ...orders.product,
              image: orders.product.image ? path + orders.product.image : null,

            },
          }
          return orders
        }),
      }
      return transaction

    })


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

exports.getDetailTransaction = async (req, res) => {
  const path = process.env.PATH_FILE

  try {
    const { id } = req.params;
    let transactions = await transaction.findOne({
      where: {
        id,
      },

      include: [
        {
          model: user,
          as: "user",
          attributes: {
            exclude: ["image", "listAs", "createdAt", "updatedAt", "idUser", "password"],
          },
        },

      ],
      attributes: {
        exclude: ["idUser", "createdAt", "updatedAt"],
      },
    });

    let orders = await order.findOne({
      where: {
        idTransaction: transactions.id

      },
      attributes: {
        exclude: ["id", "productsId", "transactionsId", "createdAt", "updatedAt"],
      },
      include: [
        {
          model: product,
          as: "product",
          attributes: {
            exclude: ["id", "idProduct", "idUser", "createdAt", "updatedAt"],
          },
        },

        {
          model: topingProduct,
          as: "topingProduct",
          attributes: {
            exclude: ["idProduct", "createdAt", "idToping", "idOrder", "updatedAt"],
          },
          include: [
            {
              model: toping,
              as: "toping",
              attributes: {
                exclude: ["image", "price", "idUser", "idToping", "idOrder", "createdAt", "updatedAt"],
              },
            }
          ]
        },
      ],
    })

    transactions = JSON.parse(JSON.stringify(transactions))
    transactions = {
      ...transactions,
      attachment: transactions.attachment ? path + transactions.attachment : null,
    }

    orders = JSON.parse(JSON.stringify(orders))
    orders = {
      ...orders,
      product: {
        ...orders.product,
        image: orders.product.image ? path + orders.product.image : null,
      },
    }

    res.send({
      status: "success...",
      data: {
        transactions, orders
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

exports.updateTransaction = async (req, res) => {
  const path = process.env.PATH_FILE

  try {
    let data = req.body
    const { id } = req.params;
    const idUser = req.user.id
    const attachment = req.file.filename
    // console.log(id)
    // console.log("image",image)
    data = {
      ...data,
      attachment
    }
    console.log(data)

    await transaction.update(data, {
      where: {
        id,
      },
    });
    let transactions = await transaction.findOne({
      where: {
        id,
      },
      attributes: {
        exclude: ["idUser", "createdAt", "updatedAt"],
      },
    });
    transactions = JSON.parse(JSON.stringify(transactions));
    res.send({
      status: "success...",
      data: {
        ...transactions,
        attachment: path + transactions.attachment,
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

exports.deleteTransaction = async (req, res) => {
  try {
    const { id } = req.params;

    await transaction.destroy({
      where: {
        id,
      },
    });
    let transactions = await transaction.findOne({
      where: {
        id,
      },
    });
    res.send({
      status: "success",
      message: `Delete transaction id: ${id} finished`,
      data: {
        id: id
      }
    });
  } catch (error) {
    console.log(error);
    res.send({
      status: "failed",
      message: "Server Error",
    });
  }
};