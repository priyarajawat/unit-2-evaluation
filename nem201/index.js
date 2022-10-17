const express = require("express")
const jwt = require("jsonwebtoken")
const UserModel = require("./modal/user.modal")
const nodemailer = require("nodemailer");
const mongoose = require("mongoose")
const HRmodel = require("./modal/hr.modal")

const app = express()

app.use(express.urlencoded({extended:true}))


app.use(express.json())
const blacklist = []


const transport = nodemailer.createTransport({
    host: "smtp.ethereal.email",
    port: 587,
    auth: {
        user: 'vella.cummings@ethereal.email',
        pass: '5ntSBQmKykbXKUTJv2'
    }
  });


app.post("/signup",async (req,res) =>{
    const {email,password,age} = req.body;
    const Manage = new UserModel({email,password,age})
    await Manage.save();
    res.send("User Creation successfull")
})

// *************************************************************


app.post("/login", async (req,res) =>{
    const {email,password,age} = req.body;
    const manage = await UserModel.findOne({email,password,age})
    if(!manage){
       return res.send("invalid credential")
    }
    const token = jwt.sign({ id:manage._id, manage: manage.email , age : manage.age},"PRIYA1234",
    {expiresIn:"5 min"}
    )
    const refreshToken =jwt.sign({ id:user._id, email: user.email , age : user.age},"REFRESHTOEKN123",{expiresIn: "5 days"})
    res.send({message:"you are looged successfully ",token,refreshToken})
})

// *************************************************************

app.get("/user/:id", async(req,res)=>{
    const {id} = req.params;
    
    const token=req.headers["authorization"];
    
    if(blacklist.includes(token)){
     return res.send("blacklisted");
    }
    
    if(!token){
        return res.status(401).send("unautorised");
    }
    try{
        const verf = jwt.verify(token,"PRIYA1234");
    
        const user = await UserModel.findById(id)
        return res.send(user)
    }catch (e){
        if(e.message === "jwt expired"){
            blacklist.push(token);
        }
        return res.status(401).send("Token is invalid")
    }
    })


// ********************

app.post("/verify", async(req,res)=>{
    const refreshtoken=req.headers.authorization

    try {
       const data= jwt.verify(refreshtoken, "REFRESHTOEKN123")
        const maintoken=jwt.sign(data,"PRIYA1234",{
          expiresIn: "5 second",
        })
        return res.send({token:maintoken})
    } catch (error) {
        return res.send("Your refresh token invalid")
    }
})

// *************************************************************
    const onetime = {};

    app.post("/reset-password/getotp", async (req, res) => {
      const { email } = req.body;
      const otp = Math.floor(Math.random() * 100000);
    
      onetime[email] = otp;
    
      transport
        .sendMail({
          to: email,
          from: "hii4@mail.com",
          subject: "OTP",
          text: `Hiii ${email}, your OTP is ${otp}`,
        })
        .then(() => {
          console.log("email sent successfully");
          res.send("Email sent success");
        });
    });
    
    app.post("/reset-password/reset",async (req, res) => {
      const { email, newPass, otp } = req.body;
    
      if (onetime[email] === otp) {
          try {
              const user = await Post.findOneAndUpdate(email,req.body,{ new: true });
              res.send(user);
              return res.send("new password updated successfully");
            } catch (error) {
              res.status(500).send(error.message);
            }
      }
      return res.status(401).send("invalid otp");
    });
 // *************************************************************
 
 app.get("/create", async (req, res) => {
    const token = req.header.authorization;
    const { email, password, Role } = req.body;
    const decode = jwt.decode(token);
  
    if (decode.role === "HR") {
      const user = new HRModel({ email, password, Role });
      await user.save();
      return res.send("User created successfully");
    } else {
      return res.status(401).send(" not allowed to create User");
    }
  });
   
    
mongoose.connect("mongodb://localhost:27017/nem201").then(()=>{
    app.listen(8080,()=>{
        console.log("server started on port http://localhost:8080")
    })
})