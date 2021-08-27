const { Router } = require("express");
 
// Controller
const { register,
   signin,
   checkAuth 
  } = require('../controllers/auth');
  
const { 
    getUsers, 
    deleteUser,
  } = require("../controllers/user");

  const { 
    getProducts,
    getDetailProduct,
    addProduct,
    deleteProducts,
  } = require("../controllers/product");


  // const { auth } = require('../middlewares/auth')
const { authentication } = require('../middlewares/auth')
const { uploadFile } = require('../middlewares/uploadFile')

const router = Router();

// Route
router.post('/register', register)
router.post('/login', signin)

router.get("/users", getUsers);
router.delete("/user/:id", deleteUser);

router.get("/products", getProducts);
router.get("/product/:id", getDetailProduct);
router.post("/product", uploadFile("imageFile"), addProduct, )




module.exports = router;
