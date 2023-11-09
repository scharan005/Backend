import express from 'express';
import path from 'path';
import mongoose from 'mongoose';

const app = express();

mongoose.connect("mongodb://127.0.0.1:27017",{
    dbName: "backend",
})
.then(() => console.log("Database Connected"))
.catch((e)=>console.log(e));

 const messageSchema = new mongoose.Schema({
    name: String,
    email: String,
 });

const Message = mongoose.model("Message",messageSchema);

const users = [];

app.set("view engine","ejs");

app.use(express.static(path.join(path.resolve(), "public")));
app.use(express.urlencoded({extended:true}));


app.get("/",(req, res) =>{
    res.render("index");
});

app.get("/success", (req,res) =>{
    res.render("success");
});


app.post("/contact", async(req,res) => {
   
    const messageData = {username: req.body.name, email: req.body.email };
    await Message.create(messageData);
    res.redirect("/success");
});





app.listen(5000, () => {
    console.log("Server is working");
});
