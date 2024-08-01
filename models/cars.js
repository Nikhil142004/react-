const { type } = require("os");

const mongoose = require("mongoose");


const carsSchema = new mongoose.Schema({
      name:{
        type:String,
        required:false
      },
      condition:{
        type:String,
        required:false
      },
      model:{
        type:String,
        required:false
      },
      Service:{
        type:String,
        required:false
      },
      Price:{
        type:String,
        required:false
      },

})
carsSchema.set('timestamps', true);
module.exports = mongoose.model("cars",carsSchema)