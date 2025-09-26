import express from "express";
import mongoose from "mongoose";
import cors from "cors"


const port = 8000
const app = express() //fetch express functionality
app.use(cors())
app.use(express.json())


mongoose.connect('mongodb+srv://shobhitha_bhat:shobiacon2208@cluster0.uugyuwo.mongodb.net/LORA')
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
app.post("/senddistress",processmessages);

app.listen(port, () => console.log(`Server running on port ${port}`));
