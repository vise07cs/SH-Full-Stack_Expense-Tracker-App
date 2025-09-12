const express=require('express');
const bodyParser=require('body-parser');
const cors=require('cors');
const userRoutes=require('./backend/routes/userRoutes');
const app=express();

app.use(bodyParser.json());
app.use(cors());

app.use("/user",userRoutes);



app.listen(3010,()=>{
    console.log("server started at port 3010");
})

