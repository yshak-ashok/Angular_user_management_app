const User=require('../models/userModel')

// Getting the all user data
const getAllUsers = async(req,res)=>{
  try {
     const users = await User.find();
     res.json(users);
  } catch (error) {
     console.log(error.message);
  }
}
// Creating a user
const createUser = async(req,res)=>{
   try{
      const { name, email, password, phone, gender} = req.body;

      const userData = await User.create({
         name:name,
         email:email,
         password:password,
         phone:phone,
         gender:gender,
      })

      res.json({status:'true',_id:userData._id});
   }catch(error){
      console.log(`Create error : `,error.message);
   }
}


// Updating the user
const updateUser = async(req,res)=>{
   try {
      const id = req.query.id;
      const {name,email,password,phone} = req.body;
      const user = await User.findByIdAndUpdate(id,
         {$set:{
            name:name,
            email:email,
            password:password,
            phone:phone,
         }}
      );
      res.json(user);
   } catch (error) {
      console.log(`Update error : `,error.message);
   }
}

// Deleting the User
const deleteUser = async(req,res)=>{
   try {
      const id = req.query.id;
      const user = await User.findByIdAndDelete(id);
      res.json(user);
   } catch (error) {
      console.log(`Delete error : `,error.message);
   }
}

// get the editing user
const getEditUser = async(req,res)=>{
   try {
      const id = req.query.id;
      const user=await User.findById(id);
      res.json(user);
   } catch (error) {
      console.log(`Get Edit error : `,error.message)
   }
}



module.exports={getAllUsers,createUser,updateUser,deleteUser,getEditUser}