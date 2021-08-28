const { Router } = require("express");

// Controller
const { register, login, } = require('../controllers/auth');

const { getUsers, deleteUser, } = require("../controllers/user");

const { deleteProduct,getProducts, getDetailProduct, addProduct, updateProduct } = require("../controllers/product");
const {  addToping,getTopings,getDetailToping,updateToping,deleteToping } = require("../controllers/toping");
const {  addTransaction,getTransactions } = require("../controllers/transaction");

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
router.post("/product", auth,uploadFile("image"), addProduct)
//update dengan gambar
router.patch("/product/:id", auth, uploadFile("image"), updateProduct)
router.delete("/product/:id", auth,deleteProduct);
//update tanpa gambar
// router.patch("/product/:id", auth, updateProduct,)

router.post("/toping", auth,uploadFile("image"), addToping)
router.get("/topings",  getTopings)
router.get("/toping/:id",  getDetailToping)
router.patch("/toping/:id", auth, uploadFile("image"), updateToping)
router.delete("/toping/:id", auth,deleteToping);


router.post("/transaction", auth, addTransaction)
router.get("/transactions", getTransactions)












module.exports = router;
