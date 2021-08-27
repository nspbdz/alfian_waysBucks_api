const { Router } = require("express");
 
// Controller
const { register,
   signin,
   checkAuth 
  } = require('../controllers/auth')

const { 
    getUsers,
    deleteUser,
  } = require("../controllers/user");
  const { 
    getProducts,
    getDetailProduct,
    deleteProducts,
  } = require("../controllers/product");

  // const { auth } = require('../middlewares/auth')
const { authentication } = require('../middlewares/auth')
const { uploadFile } = require('../middlewares/uploadFile')

const router = Router();

router.post('/register', register)
router.post('/login', signin)
// Route
router.get("/users", getUsers);
router.delete("/user/:id", deleteUser);

router.get("/products", getProducts);
router.get("/product/:id", getDetailProduct);




module.exports = router;
