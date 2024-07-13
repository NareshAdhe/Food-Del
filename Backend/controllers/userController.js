import userModel from '../models/userModel.js'
import jwt from 'jsonwebtoken'
import bcrypt from 'bcrypt'
import validator from 'validator'
import 'dotenv/config'

const registerUser = async (req, res) => {
    const { name, email, password } = req.body;
    try {
        //if user exists already
        const user = await userModel.findOne({ email });
        if (user) {
            return res.json({ success: false, message: "User Already Exists" });
        }

        //validating email format & strong password
        if(!validator.isEmail(email)){
            return res.json({ success: false, message: "Please Enter a valid email"});
        }
        if(password.length<8){
            return res.json({ success: false, message: "Please Enter a strong password"});
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password,salt);
            const newUser = await userModel.create({
                name,
                email,
                password: hashedPassword
            })
            let token = jwt.sign({userId:newUser._id},process.env.JWT_SECRET);
            res.json({success:true,token,message:"Account Created Successfully"});
    } catch (error) {
        console.log(error);
        res.json({success:false,message:'Error'});
    }
}

const loginUser = async (req, res) => {
    const { email, password } = req.body;
    try {
        //email verification
        const user = await userModel.findOne({email});
        if (!user) {
            return res.json({ success: false, message: "User Doesn't Exists" });
        }

        const isMatch = bcrypt.compare(password,user.password);
        if (!isMatch) {
            return res.json({ success: false, message: "Invalid Credentials" });
        }
            let token = jwt.sign({userId:user._id},process.env.JWT_SECRET);
            res.json({success:true,token,message:"Logged In Successfully"});
    } catch (error) {
        console.log(error);
        res.json({success:false,message:'Error'});
    }
}

export { registerUser, loginUser };