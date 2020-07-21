const express = require("express");
const router = express.Router();

const {getCategoryById,getCategory,getAllCategory,updateCategory,removeCategory,createCategory} = require("../controllers/category")
const {getUserById} = require("../controllers/user")
const {isSignedIn,isAuthenticated,isAdmin} = require("../controllers/authentication")

//Permeter
router.param("userId",getUserById);
router.param("categoryId",getCategoryById);

//Actual Routes Here
router.post("/category/create/:userId",isSignedIn,isAuthenticated,isAdmin,createCategory);
router.put("/category/:categoryId/:userId",isSignedIn,isAuthenticated,isAdmin,updateCategory);
router.delete("/category/:categoryId/:userId",isSignedIn,isAuthenticated,isAdmin,removeCategory);
router.get("/category/:categoryId",getCategory);
router.get("/categories",getAllCategory);





module.exports = router;
