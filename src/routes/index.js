const { Router } = require("express");

// Controller
const { register, login, } = require('../controllers/auth');

const { getUsers, deleteUser, } = require("../controllers/user");

const { deleteProduct,getProducts, getDetailProduct, addProduct, updateProduct, deleteProducts, } = require("../controllers/product");

// const { auth } = require('../middlewares/auth')
const { auth } = require('../middlewares/auth')
const { uploadFile } = require('../middlewares/uploadFile')

const router = Router();

// Route
router.post('/register', register)
router.post('/login', login)

router.get("/users", getUsers);
router.delete("/user/:id", deleteUser);

router.get("/products", getProducts);
router.get("/product/:id", getDetailProduct);
router.post("/product", auth,uploadFile("image"), addProduct,)
//update dengan gambar
router.patch("/product/:id", auth, uploadFile("image"), updateProduct)
router.delete("/product/:id", auth,deleteProduct);


//update tanpa gambar
// router.patch("/product/:id", auth, updateProduct,)





module.exports = router;
