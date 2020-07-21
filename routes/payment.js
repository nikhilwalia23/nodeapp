const express = require("express");
const router = express.Router();
const {isSignedIn,isAuthenticated} = require("../controllers/authentication")
const {getUserById} = require("../controllers/user")
const {gettoken,processpayment} = require("../controllers/paymentB")

router.param("userId",getUserById);

router.get("/payment/gettoken/:userId",isSignedIn,isAuthenticated,gettoken);
router.post("/payment/braintree/:userId",isSignedIn,isAuthenticated,processpayment);

module.exports = router;
