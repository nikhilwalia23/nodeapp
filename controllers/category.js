const Category = require("../models/category")
exports.getCategoryById = (req,res,next,id) => {
  Category.findById(id).exec((err,category) => {
      if(err){
          return res.status(400).json({
              error: "Category Not Found in DB"
          })
      }
      req.category=category;
      next();
  })

};

//Store New Category in DB
exports.createCategory = (req,res) => {
    const category = new Category(req.body)
    category.save((err,category) => {
        if(err)
        {  
            return res.status(400).json({
                error: "This Category Allreadt Present In DB"
            })
        }
        return res.json(category);

    })

}

exports.getCategory = (req,res) => {
    return res.json(req.category);
}
//GET List Of all Category in DB
exports.getAllCategory = (req,res) => {
    Category.find().exec((err,items) => {
        if(err) {
            return res.status(400).json({
                error: "No Category Found"
            })
        }
        res.status(200).json(items);
    });
};

//Update Category in DB
exports.updateCategory = (req,res) => {
    const category = req.category;
    category.name = req.body.name;
    category.save((err,updatedCategroy) => {
        if(err) {
            return res.status(400).json({
                error:"Failed to Update"
            });
        }
        return res.json(updatedCategroy);
    });
    
};

//Delete Category From Database
exports.removeCategory = (req,res) => {
    const category = req.category;
    category.remove((err,category) => {
        if(err)
        {
            return res.status(400).json({
                error: "failed to delete category"
            })
        }
        return res.status(200).json({
            message: "Successfully deleted"
    
        })
        
    })
    

}
