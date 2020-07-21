const express = require("express");
const router = express.Router();

const {isSignedIn,isAuthenticated,isAdmin} = require("../controllers/authentication");
const {getUserById,pushOrderInPurchaseList} = require("../controllers/user");
const { updateInventory , getProductById} = require("../controllers/product")


const {getOrderById,createOrder,getAllOrder,getAllOrderStatus,UpdateStatus,createCart,getCart,delCart,checkOrders} = require("../controllers/order")

//parameters extracter
router.param("userId",getUserById)
router.param("orderId",getOrderById)
router.param("productId",getProductById)

//Actula Routes
router.post("/order/create/:userId/",
isSignedIn,
isAuthenticated,
pushOrderInPurchaseList,
updateInventory,
createOrder);


//Check All Order list
router.get("/order/all/:userId",
isSignedIn,
isAuthenticated,
isAdmin,
getAllOrder
);

//Add Item to UserCart
router.post("/cart/:productId/:userId",
isSignedIn,
isAuthenticated,
createCart,
);

//Get Item From User Cart
router.get("/cart/:userId",
isSignedIn,
isAuthenticated,
getCart,
);

//Remove Item From User Cart
router.post("/delcart/:productId/:userId",isSignedIn,
isAuthenticated,delCart)

//Make Single Order At a Time 

router.post("/order/create/:productId/:userId",isSignedIn,
isAuthenticated,pushOrderInPurchaseList,updateInventory,createOrder)

//Check Orders
router.get("/order/:userId",isSignedIn,isAuthenticated,checkOrders);



router.get("/order/status/:userId",isSignedIn,isAuthenticated,isAdmin,getAllOrderStatus)
router.put("/order/:orderId/status/:useId",isSignedIn,isAuthenticated,isAdmin,UpdateStatus)

module.exports = router;
