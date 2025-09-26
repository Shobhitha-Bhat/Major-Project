import express from "express";
import mongoose from "mongoose";
import cors from "cors"



const app = express() //fetch express functionality
app.use(cors())
app.use(express.json())

const port = process.env.PORT || 8000;

mongoose.connect(process.env.MONGO_URI)
.then(()=>{
    console.log("Database Connected")
})
.catch((error)=>{
    console.log(error)
})

let messageSchema = new mongoose.Schema({
     message : { type : String },
})

let msgModel = new mongoose.model('DistressMessage',messageSchema)


const processmessages = async(req,res) =>{
    const { message } = req.body;
const result = await msgModel.create({ message });

    res.status(200).json({msg:"A new Message added to DB"});
}
const getmessages = async(req,res)=>{
    let messages = await msgModel.find();
    
    res.status(200).json(messages);
}
app.post("/senddistress",processmessages);
app.get("/getdistresses",getmessages);
app.listen(port, () => console.log(`Server running on port ${port}`));
