const express = require('express');
var bodyParser = require('body-parser')
const mongoose = require("mongoose")
const users = require("./models/users");
const product = require('./models/product');
require("dotenv").config()
const app = express();
const port = 8000;

// app.use(express.json());
let MONGO_URI = process.env.MONGO_URI
// let uri = "mongodb+srv://parmarankit7470:zGM8yj2Wu3BHgvhI@cluster0.9uocqgx.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"
mongoose.connect(MONGO_URI)
.then(() => {
    console.log("database connected")
})
.catch((err)=>{
  console.log(err)
});


// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json())

let laptops = [
    { id: 1, brand: 'Dell', model: 'XPS 13', year: 2021 },
    { id: 2, brand: 'Apple', model: 'MacBook Pro', year: 2020 },
    { id: 3, brand: 'HP', model: 'Spectre x360', year: 2022 }
  ];
  
// Get all laptops
app.get("/",(req,res)=>{
    
  res.send("welcome to backend laptop ")
  
})
app.get('/laptops', (req, res) => {
    res.json(laptops);
  });
  
  // Get a single laptop by ID
  app.get('/laptops/:id', (req, res) => {
    const laptop = laptops.find(l => l.id === parseInt(req.params.id));
    if (!laptop) return res.status(404).send('Laptop not found');
    res.json(laptop);
  });

  // Add a new laptop
  app.post('/laptops', (req, res) => {
    const newLaptop = {
      id: laptops.length + 1,
      brand: req.body.brand,
      model: req.body.model,
      year: req.body.year
    };
    laptops.push(newLaptop);
    res.status(201).json(newLaptop);
  });


app.post("/signup",async(req,res)=>{
 try{


  let updateData = {
    // database_kayname:value
    name:req.body.name,
    email:req.body.email,
    password:req.body.password

  }

 const isUserExists = await users.findOne({"email":req.body.email})
 console.log(isUserExists)
 if(isUserExists){
  // this condition is only valid for object variable
  return res.status(400).json({
    status:false,
    message:"Email already registered!"
  })

 }
  
 const userData = new users(updateData)
 const saveData =  await userData.save()
  return res.json({
    status:true,
    data:saveData
  })
}
catch(error){
  console.log(error)
  return res.status(500).json({status:false,message:error.message})
}

})
  
app.get('/users', async(req, res) => {
  try{
    const data  = await users.find()
    if(data.length===0){
     return res.json({
       status:false,
       data:data
      })
    }
    return res.json({
     status:true,
     data:data
    })
  }
  catch(error){
    console.log(error)
    return res.status(500).json({status:false,message:error.message})
  }
  
});

app.get('/get-user-by-id/:id', async(req, res) => {
  console.log(req.params)
  const userId = req.params.id
  // const data  = await users.findOne({"_id":userId})
  const data  = await users.findById(userId)
  if(data){
    return res.json({
      status:true,
      data:data
     })
  }

  return res.json({
    status:false,
    data:data
   })
  
});


// app.get('/delete-user-by-id/:id', async(req, res) => {
//   console.log(req.params)
//   const userId = req.params.id
//   // const data  = await users.findOne({"_id":userId})

//   const isUserExits = await users.findOne({
//     "name":"test2",
//     "email":"test@gmail.com"
//   })

// if(!isUserExits){
//   return res.status(400).json({
//     status:false,
//     message:"User not found"
//   })
// }

//   const data  = await users.findOneAndDelete({
//     "name":"test2",
//     "email":"test@gmail.com"
//   })


//   return res.json({
//     status:true,
//     message:"User Deleted Successfully"
//    })
  
// });

app.get('/delete-user-by-id/:id', async(req, res) => {
  console.log(req.params)
  const userId = req.params.id

  const isUserExits = await users.findById(userId)

  if(!isUserExits){
    return res.status(400).json({
      status:false,
      message:"User not found"
    })
  }

  const data  = await users.findByIdAndDelete(userId)


  return res.json({
    status:true,
    message:"User Deleted Successfully"
   })
  
});

app.post("/product",async(req,res)=>{
  console.log(req.body)
  let updateData = {
    // database_kayname:value
    name:req.body.name,
    email:req.body.email,
    password:req.body.password

  }
  
  const productData = new product(updateData)
 const saveData =  await productData.save()
  res.send(saveData)
})
  

app.get('/product', async(req, res) => {
  const data  = await product.find()
  res.json({
   data:data
  })
});


app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
