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
electronicsSchema.set('timestamps', true);
module.exports = mongoose.model("electronics",electronicsSchema)