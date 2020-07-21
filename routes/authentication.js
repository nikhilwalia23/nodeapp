var express = require('express');
var router = express.Router();


const { logout,signup,signin,isSignedIn } = require("../controllers/authentication.js");
const { check, validationResult } = require('express-validator');


router.use('/logout',logout);

router.post('/signup',[
    check("name").isLength({min: 5}).withMessage("Name Should be atleast of Length of 5"),
    check("email").isEmail().withMessage("email is not valid"),
    check("password").isLength({min:8}),
],
signup
);


router.post('/signin',[
    check("email").isEmail().withMessage("Use Poper email Address"),
    check("password").isLength({min:1}).withMessage("Password Required"),
],
signin
);

router.get('/testroute',isSignedIn,(req,res) =>{
    res.json(req.auth);
})



module.exports = router; 
