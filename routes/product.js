const express = require("express");
const router = express.Router();

const {isSignedIn,isAuthenticated,isAdmin} = require("../controllers/authentication");
const {getUserById} = require("../controllers/user")
const {getProductById,createProduct,getProduct,photo,deleteProduct,updateProduct,getAllProducts} = require("../controllers/product")
const { check, validationResult } = require('express-validator');

//All Params
router.param("userId",getUserById);
router.param("productId",getProductById);

//All Actual Routes
router.post("/product/create/:userId",isSignedIn,isAuthenticated,isAdmin,createProduct);
router.get("/product/:productId",getProduct);
router.get("/product/photo/:productId",photo)
router.delete("/product/:productId/:userId",isSignedIn,isAuthenticated,isAdmin,deleteProduct);
router.put("/product/:productId/:userId",isSignedIn,isAuthenticated,isAdmin,updateProduct);
router.get("/products", getAllProducts)

module.exports = router;
