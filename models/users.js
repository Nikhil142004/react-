// const mongoose = require('mongoose');

// const itemSchema = new mongoose.Schema({
//     item_name: {
//         type: String,
//         required: false,
//     }
// });

// itemSchema.set('timestamps', true);
// module.exports = mongoose.model('foodaddonitem',itemSchema,'foodaddonitem');

const mongoose = require("mongoose")


const userSchema  = new mongoose.Schema({
    name:{
        type:String,
        required:false
    },
    email:{
        type:String,
        required:false
    },
    password:{
        type:String,
        required:false
    },
    
})
userSchema.set('timestamps', true);
module.exports = mongoose.model("users",userSchema)