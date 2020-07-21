const mongoose = require("mongoose");
const {ObjectId} = mongoose.Schema;

const ProductCartSchema = new mongoose.Schema({
    product: {
        type: ObjectId,
        ref: 'Product',
    },
    user: {
         type:ObjectId,
         ref:'User',
    },
    count: {type: Number,default:1},
    price: {type:Number},

}, {timestamps:true}); 

const ProductCart = mongoose.model("ProductCart", ProductCartSchema);

const orderSchema = new mongoose.Schema({
    products: [ProductCartSchema],
    user: {
        type: ObjectId,
        ref: "User",
    },
    status: {
        type: String,
        default: "Processing",
        enum: ["Cancelled", "Delivered" , "Shipped", "Processing", "Out For Delivery"]
    },
    ammount: {type: Number},
    address: {type:String},
    city:{type:String},
    payment:{type:String, default: "COD",enum:["ByCard","COD"]}

},{timestamps:true});

const Order = mongoose.model('Order',orderSchema);

module.exports = {Order,ProductCart};
