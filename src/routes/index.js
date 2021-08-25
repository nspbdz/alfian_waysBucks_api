const { Router } = require("express");
 
// Controller
const { users, Profile, updateUser,deleteUser } = require('../controllers/user')


const router = Router();



module.exports = router;
