const Product = require("../models/product");
const formidable = require("formidable");
const _ = require("lodash");
const fs = require("fs");
//Middleware To Find Product By Id In Prameteres
exports.getProductById = (req,res,next,id) => {
    Product.findById(id).exec((err,product) => {
        if(err)
        {
            return res.status(400).json({
                error : "Data Not Found"
            })
        }
        req.product = product;
        next();
    })

};

//Store New Product In Database
exports.createProduct = (req,res,) => {
    let form = new formidable.IncomingForm();
    form.keepExtensions = true;
    form.parse(req, (err,fields,file) => {
        if(err)
        {
            return res.status(400).json({
                error: "Problem With Image"
            })
        }
        if(!fields.name || !fields.price || !fields.description || !fields.category || !fields.stock)
        {
            return res.status(400).json({
                error: "Please All Includes "
            })

        }
        //TODO: Restriction on field
        let product = new Product(fields);


        //Handle Files Here
        if(file.photo)
        {
            if(file.photo.size > 3000000){
                return res.status(400).json({
                    error: "Image Size Should be less than 3MB"
                })
            }
            product.photo.data = fs.readFileSync(file.photo.path)
            product.photo.contentType = file.photo.type
        }
        //Save Data
        product.save((err,product) => {
            if(err)
            {
                return res.status(400).json({
                    error: "Unable To save the Data"
                })
            }

            return res.json(product);
        })
    })
}

//View Single Project In Datbase
exports.getProduct = (req,res) => {
    req.product.photo = undefined;
    return res.status(200).json(req.product);
}

//MiddleWare
exports.photo = (req,res,next) => {
    if(req.product.photo)
    {
        res.set("Content-Type",req.product.photo.contentType);
        return res.send(req.product.photo.data);
    }
    next();
}
//Delete Product
exports.deleteProduct = (req,res) => {
    let product = req.product;
    product.remove((err,deletedProduct) => {
        if(err)
        {
            return res.status(400).json({
                error: "Unable To delete"
            })
        }
        return res.json({
            meassage: "Product Deleted",
            dproduct:deletedProduct
        });
    })

}
exports.updateProduct = (req,res) => {
    let form = new formidable.IncomingForm();
    form.keepExtensions = true;
    form.parse(req, (err,fields,file) => {
        if(err)
        {
            return res.status(400).json({
                error: "Problem With Image"
            })
        }
       //Updation Of Code
        let product = req.product;
        product = _.extend(product,fields)


        //Handle Files Here
        if(file.photo)
        {
            if(file.photo.size > 3000000){
                return res.status(400).json({
                    error: "Image Size Should be less than 3MB"
                })
            }
            product.photo.data = fs.readFileSync(file.photo.path)
            product.photo.contentType = file.photo.contentType
        }
        //Save Data
        product.save((err,product) => {
            if(err)
            {
                return res.status(400).json({
                    error: "Updation Of Product is Failed"
                })
            }

            return res.json(product);
        })
    })

}
//Listing all Products in Database


exports.getAllProducts = (req,res) => {
    let limit = req.query.limit ? parseInt(req.query.limit) : 8;
    let sortBy = req.query.sortBy ? req.query.sortBy : "_id" 
Product.find()
.select("-photo")
.populate("category")
.sort([[sortBy,"asc"]])
.limit(limit)
.exec((err,products) => {

    if(err)
    {
        return res.status(400).json({
            error: "No Product Found In Database"
        })
    }
    if(products.length===0){
     console.log("NO DAta Foound");
    }
    return res.status(200).json(products)
})
}

//Middlerware to Update Inventory Of Prodcuts 
//Error is Setting True Please Fixe this Issue
exports.updateInventory = (req,res,next) => {
req.body.order.products.forEach((product) => {
Product.findOne({_id:product._id},(err,product) => {
if(err){
console.log("Unable To Get Product")
}
Product.findOneAndUpdate({_id:product._id},{$inc:{sold:1,stock:-1}}).then((err,result) => {

})
})
})



next();
   

}
