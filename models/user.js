const mongoose = require('mongoose');

const crypto = require('crypto');

const uuidv1 = require("uuid/v1");

  var userSchema = new mongoose.Schema({
      name: {
          type: String,
          required: true,
          maxlength: 30,
          trim: true,
      },
      last_name:{
          type: String,
          trim: true,
          maxlength:15,
      },
      email:{
          type: String,
          trim: true,
          required: true,
          unique: true,
      },
      encry_password:{
          type: String,
          required: true,
      },
      salt: String,
      privellages:{
          type: Number,
          default: 0,
      },
      purchases:{
          type: Array,
          default: [],
      }
  },{timestamps:true});
//Method that setting up salt key for eccryption and calling secure password for enrypting Password
userSchema.virtual("password").set(function(password){ 
    this._password = password;
    this.salt = uuidv1();
    this.encry_password = this.securePassword(password);
})
.get(function(){
    return this._password;
})

//Mehtods For Encryption and Authentication
userSchema.methods = 
{
    securePassword: function(plainpassword)
    {
        if(!plainpassword) return "";
        try
        {
            return crypto.createHmac('sha256',this.salt).update(plainpassword).digest('hex');

        }
        catch(err)
        {
            return '';
        
        }
        
    },
    authenticate: function(plainpassword)//Mehtod For authencation of User
    {
        return this.securePassword(plainpassword) === this.encry_password;

    }
    
};

module.exports = mongoose.model("User",userSchema);