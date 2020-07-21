const User = require("../models/user");
const Order = require("../models/order");



exports.getUserById = (req,res,next,id)  => {
    User.findById(id).exec((err,user) => {
            if(!user)
            {
                return res.status(400).json({
                    error: "No User Found"
                })
            }
            req.profile = user;
            next();

    })
}

exports.getUser = (req,res) => {
    req.profile.salt = undefined;
    req.profile.encry_password = undefined;
    req.profile.createdAt = undefined;
    req.profile.updatedAt= undefined;

    return res.json(req.profile);
} 


exports.updateUser = (req,res) => {
   User.findByIdAndUpdate(
       {
           _id: req.profile._id
       },
       {
           $set: req.body
       },
       {
           new: true, useFindAndModify: false
       },
       (err,user) => {
           if(err){
               return res.status(400).json({
                   error:"You are Not autheroised to update user"
               })
           }
           user.salt = undefined;
           user.encry_password = undefined;
           res.json(user);

       }
   )
}


//Get Details of User Purchase List
exports.userPurchaseList = (req,res) => {
    Order.find({user: req.profile._id})
    .populate("user","_id name").exec((err,order) => {
        if(err)
        {
            return res.status(400).json({
                error: "No Order Found"
            })

        }
        return res.json(order);
    })

}

//Add Order in User Purchase List(Work Here )
exports.pushOrderInPurchaseList = (req,res,next) => 
{
    let purchases = [];

    req.body.order.products.forEach(data => {
        purchases.push({
            Item:data
        })
        
    });
   
    
    //Store data in DataBase
    User.findOneAndUpdate(
        {_id:req.profile._id},
        {$push: {purchases:purchases}},
        {new:true},
        (err,purchase) =>{
            if(err)
            {
                return res.status(400).json({
                    error:"Unable To Save Purchase List"
                })
            }
            next();

        }
    );
     
}
