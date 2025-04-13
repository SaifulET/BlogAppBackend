import userModel from "../model/userModel.js";
import bcrypt from "bcrypt";
import jwt from 'jsonwebtoken'
import userContact from "../model/UserContact.js";


 export const register=async(req,res)=>{
    try{
        
        let {name,email,password}=req.body;
        console.log(name,email,password);
        bcrypt.hash(password,10)
        .then(async hash=>{
            // userModel.create({"name":name,"email":email,"password":hash,})
           let newUser = new userModel({"name":name,"email":email,"password":hash,});
           await newUser.save();
        res.send({data:"success"})
        }).catch(e=>res.send({msg:e.data}))
          
    }catch(e){
        res.send({msg:e.data});
    }
      
}
export const login =async(req,res)=>{
    try{
        let {email,password}=req.body;
        
        const data =await userModel.findOne({ email: email }).exec();
        if(data){
            bcrypt.compare(password,data.password,(e,response)=>{
                
                if(response){
                    let token = jwt.sign({email:data.email},"jwt-secret-key",{expiresIn:"1d"});
                    res.cookie("token", token, { 
                        httpOnly: false, // ❌ Set to true in production if frontend should NOT access it
                        secure: false,   // ✅ Use `true` in production (HTTPS required)
                        sameSite: "Lax",
                        maxAge: 3600000,
                      });
                    res.json({data:"success",msg:"user has looged in",token, user:{}})
                }
                else{
                    res.json({data:"failed",msg:"worng password!"})
                }
            })
            
        }
        else{
            res.json({data:"failed",msg:"has no data"})
        }
    }catch(e){
           res.json({data:"faild",msg:"user not exist"});
    }
}
export const verify=async(req,res)=>{
    return res.json("success");
}
export const logout=async(req,res)=>{
    res.clearCookie("token", { httpOnly: true, secure: true, sameSite: "strict" });
    res.status(200).json({ message: "Logged out successfully" });
}
export const Contact=async(req,res)=>{
    try{
        
        let {name,email,message}=req.body;
            userContact.create({name,email,message})
            res.send({data:"success"})
          
    }catch(e){
        res.send({msg:e.data});
    }
}
