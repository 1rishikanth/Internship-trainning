const express =require("express");
const mongoose = require('mongoose');
const path = require('path');
const fs = require('fs');
const app = express();
const multer = require('multer');
const port = 3000;
app.use(express.static("public"));
app.use(express.json());
mongoose.connect('mongodb://127.0.0.1:27017/DATA', { useNewUrlParser: true, useUnifiedTopology: true });
const db = mongoose.connection;
db.once('open', () => {
    console.log("MongoDB connection successful");
});
const userSchema = new mongoose.Schema({
    username: String,
    password: String,
    gmail: String,
    dob: Date,
    image: {
        data: Buffer,
        contentType: String,
        url: String
    }
});
const User = mongoose.model("User", userSchema);
app.get("/",(req,res)=>{
    res.render("home.ejs");
});
app.get("/login",(req,res)=>{
    res.render("login.ejs");
});
app.get("/sign_in",(req,res)=>{
    res.render("sign_in.ejs");
});
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/');
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + '-' + file.originalname);
    }
});
const upload = multer({ storage: storage });
app.post('/post', upload.single('image'), async (req, res) => {
    const { username, password, gmail,dob } = req.body;
    const image = {
        data: fs.readFileSync(req.file.path),
        contentType: req.file.mimetype,
        url: `/uploads/${req.file.filename}`
    };
    const user = new User({
        username,
        password,
        gmail,
        dob,
        image
    });
    await user.save();
    console.log(user);
    res.redirect(`/success?username=${username}&password=${password}&gmail=${gmail}&dob=${dob}&image=${image.url}`);
});
app.post('/post1',async (req,res)=>{
    const {username,password} = req.body;
    const result=await User.findOne({username,password});
    console.log(result);
    if(result!=null){
        res.send(`
        <h1>Successfully signed In</h1>
        `)
    }
    else{
        res.send(`<h1>Invalid username</h1>`)
    }
})

app.get('/success', (req, res) => {
    const { username, password, gmail, dob, image } = req.query;
    res.send(`
        <h1 >Successfully Logged In</h1>
        <img src="${image}" alt="Uploaded Image" style="max-width: 200px; max-height: 200px;"/>
        <p>userName: ${username}</p>
        <p>password: ${password}</p>
        <p>Email ID: ${gmail}</p>
        <p>DOB: ${dob}</p>
       
    `);
});
app.listen(port,()=>{
    console.log(`server started on port ${port}`);
});