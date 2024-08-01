
const mongoose = require("mongoose");
const productSchema = new mongoose.Schema({
      name:{
        type:String,
        required:false
      },
      Description:{
        type:String,
        required:false
      },
      Size:{
        type:String,
        required:false
      },
      contity:{
        type:String,
        required:false
      },
      Price:{
        type:String,
        required:false
      },

})
productSchema.set('timestamps', true);
module.exports = mongoose.model("product",productSchema)