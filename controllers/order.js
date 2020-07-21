const {Order,ProductCart} = require("../models/order");
//Ger Order Detail By Id
exports.getOrderById = (req,res,next,id) => {
    Order.findById(id)
    .populate("products.product","name price")
    .exec((err,order) => {
        if(err)
        {
            return res.status(400).json({
                error: "No Order Found "
            })
        }
        req.order = order;
        next();
    })
}
//Make Order 
exports.createOrder = (req,res) => {
  req.body.order.user = req.profile._id;
  const order = new Order(req.body.order);
  order.save((err,order) => {
      if(err)
      {
          return res.status(400).json({
              erorr: "Failed To Confirm Order"
          })
      }
      return res.json(order);
  });
};

//Check Orders 
exports.checkOrders = (req,res) => {
  Order.find(
  {
    user:req.profile._id 
  }
).exec((err,orders) => 
{
     if(err)
     {
        return res.status(400).json({error:"Unable To Fetch From DB"}) ;
     }
     return res.status(200).json(orders); 
})

}

//


//Get list Of orders
exports.getAllOrder = (req,res) => {
    Order.find()
    .populate("user", "_id name")
    .exec((err,order) => {
        if(err)
        {
            return res.status(400).json({
                error: "No Order Found DB"
            })
        }
        return res.status(200).json(order)
    });
};


//Save User Cart Informations in Databases
exports.createCart = (req,res) => {
    req.body.user = req.profile._id;
    req.body.product = req.product._id;
    const cart = new ProductCart(req.body);
    cart.save((err,cart) => {
    if(err)
         {
            return res.status(400).json({
              erorr: "Failed To Pust Order in Cart"
            });
         }
     return res.status(200).json(cart)
    })
     

}

//Get Cart Data From Database 
exports.getCart = (req,res) => 
{
    ProductCart.find(
    {
    user:req.profile._id
    })
   .populate({path:'product',select:'name price description _id'}).exec((err,cart)=> {
    if(err)
    {
       return res.status(400).json({error:"Unable Fetch Cart From DataBase"})
    }
    return res.status(200).json(cart)
    })
}


//Delete Cart From Database
exports.delCart = (req,res,) => 
{ 
ProductCart.deleteOne({user:req.profile._id,product:req.product._id}).exec((error,cart) => {
        if(error)
        {
           return res.status(400).json({error:"Unable To Delete Cart from Database"}) 
        }
        return res.status(200).json(cart)
})
   
}



//TODO : Write These Tow Functions latter
exports.getAllOrderStatus = () => {


}

exports.UpdateStatus = () => {}
