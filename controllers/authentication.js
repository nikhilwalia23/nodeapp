const User = require("../models/user.js");
const { check, validationResult } = require('express-validator');
var jwt = require('jsonwebtoken');
var expressJwt = require('express-jwt');

exports.logout = (req,res) => {
    res.clearCookie("token");
    res.json({
      'Meassage':"User logout Successfully"
    })

};


exports.signup = (req,res) => {
   
    const errors = validationResult(req);

    if(!errors.isEmpty())
    {
        return res.status(400).json({
            error_msg: errors.array()[0].msg,
            error_field: errors.array()[0].param

        });

    }
    else
    {
        //Save User to DataBase     
        const user = new User(req.body);
        user.save((err,user) => {
            if(err){
                return res.status(400).json({
                    err: "Not Able To Store Data in DB"
                })
            }
            else{

                return res.status(200).json(user);
            }
        });
        
    
       
    }

};
 

exports.signin = (req, res) => {
  //extracting email and Password checking their Format
    const { password, email } = req.body;
    
    const errors = validationResult(req);
  
    if (!errors.isEmpty()) {
      return res.status(422).json({
        error: errors.array()[0].msg
      });
    }
  //Authenticating User
    User.findOne({ email },(err, user) => {
      if(!user)
      {
        res.status(400).json({
          error: "USER email does not exists"
        });
      }

      else
      {
        //Checking  Password Of User 
        if (!user.authenticate(password)) 
        {
          return res.status(401).json({
          error: "Incorrect Password"
          });
        }
        //create token
        const token = jwt.sign({ _id: user._id }, process.env.SECRET);
        //put token in cookie //Vissit here
        res.cookie("token", token, { expire: new Date() + 9999 });
  
        //send response to front end
        const { _id, name, email, privellages } = user;
        return res.json({ token, user: { _id, name, email, privellages } });

    }//else block end here

    });


  };
  //Protected Routes
  exports.isSignedIn = expressJwt({
    secret: process.env.SECRET,
    userProperty:"auth"
  })



  //Custom Middleware
exports.isAuthenticated = (req,res,next) => 
{
  let checker = req.profile && req.auth && req.profile._id == req.auth._id;
  if(!checker)
  {
    return res.status(403).json({
      error: "Access denied bro"
    })

  }
  next();

}

exports.isAdmin = (req,res,next) => 
{
  if(req.profile.privellages === 0)
  {
    return res.status(403).json({
      error: "You are not Admin, Acess Denied"
    })
  }

  next();
}
 

