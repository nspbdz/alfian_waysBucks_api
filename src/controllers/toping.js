const {
  toping
} = require("../../models");



exports.addToping = async (req, res) => {
  const path = process.env.PATH_FILE

  try {
    const {
      ...data
    } = req.body;
    const idUser = req.user.id
    // console.log(idUser)
    // console.log("idUser",req.user.id)

    // console.log("request file", req.file);
    const newToping = await toping.create({
      ...data,
      image: req.file.filename,
      idUser: idUser
    });


    let topingData = await toping.findOne({
      where: {
        id: newToping.id
      },
      attributes: {
        exclude: ["idUser", "createdAt", "updatedAt"],
      },

    });
    topingData = JSON.parse(JSON.stringify(topingData));

    res.send({
      status: "success...",
      data: {
        ...topingData,
        image: path + topingData.image,
      },
    });
    res.send({
      status: "success",
      message: "resource has successfully created",
      data: topingData
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({

      status: "failed",
      message: "internal server error",
    });
  }
};

exports.getTopings = async (req, res) => {
  const path = process.env.PATH_FILE

  try {
    let topings = await toping.findAll({

      attributes: {
        exclude: ["idUser", "createdAt", "updatedAt"],
      },
    });

    topings = JSON.parse(JSON.stringify(topings));
    topings = topings.map(toping => {
      return {
        ...toping,
        image: toping.image ? path + toping.image : null
      }
    })

    res.send({
      status: "success...",
      data: topings
    });

  } catch (error) {
    console.log(error);
    res.send({
      status: "failed",
      message: "Server Error",
    });
  }
};

exports.getDetailToping = async (req, res) => {
  const path = process.env.PATH_FILE

  try {
    const {
      id
    } = req.params;
    // console.log(id)

    let topings = await toping.findOne({
      where: {
        id,
      },
      attributes: {
        exclude: ["idUser", "createdAt", "updatedAt"],
      },
    });


    // console.log(topings)
    topings = JSON.parse(JSON.stringify(topings));
    res.send({
      status: "success...",
      data: {
        ...topings,
        image: path + topings.image,
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


exports.updateToping = async (req, res) => {
  const path = process.env.PATH_FILE

  try {
    let data = req.body
    const {
      id
    } = req.params;
    const idUser = req.user.id
    const image = req.file.filename
    // console.log(id)
    // console.log("image",image)
    data = {
      ...data,
      image
    }
    console.log(data)

    await toping.update(data, {
      where: {
        id,
      },
    });
    let topings = await toping.findOne({
      where: {
        id,
      },
      attributes: {
        exclude: ["idUser", "createdAt", "updatedAt"],
      },
    });
    topings = JSON.parse(JSON.stringify(topings));

    res.send({
      status: "success...",
      data: {
        ...topings,
        image: path + topings.image,
      },
    });
    res.send({
      status: "success",
      message: "resource has successfully deleted",
      data: topings,
    });
  } catch (error) {
    // console.log(error)
    res.status(500).send({
      status: "failed",
      message: "internal server error",
    });
  }
};

exports.deleteToping = async (req, res) => {
  try {
    const {
      id
    } = req.params;

    await toping.destroy({
      where: {
        id,
      },
    });
    let topingDelete = await toping.findOne({
      where: {
        id,
      },
    });
    res.send({
      status: "success",
      message: `Delete toping id: ${id} finished`,
      // data:topingDelete
    });
  } catch (error) {
    console.log(error);
    res.send({
      status: "failed",
      message: "Server Error",
    });
  }
};