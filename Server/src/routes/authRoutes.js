const express = require("express");
const { registerUser, loginUser,getAllUsers ,deleteUser} = require("../../src/Controllers/userAuthorization/authController"); // ✅ Correct Import

const router = express.Router();

//http://localhost:8049/apis/auth/


// ✅ Route for user registration
router.post("/register", registerUser);
router.post("/login",loginUser);

//Get oll users 
router.get("/",getAllUsers);

router.delete("/delete/:id", deleteUser);


module.exports = router;
