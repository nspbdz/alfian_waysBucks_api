const { Router } = require("express");
 
// Controller
const { 
    getUsers,
    deleteUser,
  } = require("../controllers/user");

const router = Router();

// Route
router.get("/users", getUsers);
router.delete("/user/:id", deleteUser);



module.exports = router;
