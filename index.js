 const express= require('express')
 require('dotenv').config()
 require('./db')
 const app =express();
const port = process.env.PORT||8080;
const apis= require('./routes/index');
 app.use(express.json());
 app.use('/api',apis);
 app.listen(port,()=>{
     console.log(`Server is running ${port}`)
 })