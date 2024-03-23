// server Conncetion
const express=require("express")
const app=express()
const path = require('path');
const dotenv=require('dotenv')
dotenv.config()

// Cross origin resourse sharing (CORS)
const cors = require('cors');
let corsOptions ={
  origin:`http://localhost:4200`,
}

//Port Conncetion
const PORT=process.env.PORT || 3000;

//Database Conncetion
const mongoose=require('mongoose')
mongoose.connect(process.env.MONGODB_URL).then(()=>{console.log('Database Connceted');})

//converting body string to json
app.use(express.static(path.join(__dirname, 'Images')));
app.use(express.json());
app.use(cors(corsOptions));

const userRouter=require('./routes/userRouter')
const adminRouter=require('./routes/adminRouter')
app.use('/user',userRouter)
app.use('/admin',adminRouter)

app.listen(PORT,()=>{
  console.log(`Server is running at port:${PORT}`);
})