import User from '../models/user.model.js';
import bcryptjs from 'bcryptjs';
import generateTokenSetCookie from '../utils/generateToken.js';
export const signup = async(req,res)=>{
    try {
        const {fullName,username,password,confirmPassword,gender} = req.body;
        if(password !== confirmPassword){
            return  res.status(400).json({error:"Passwords don't match"});//it is followed by a json object
        }

        const user = await User.findOne({username}); // to check if this user exists in the database

        if(user){
            return res.status(400).json({error:"Username already exists"})
        }

        //Hash password here
        const salt = await bcryptjs.genSalt(10);
        //The higher this gensalt value, the slower will be hashing
        const hashedPassword = await bcryptjs.hash(password,salt);

        const boyProfilePic = `https://avatar.iran.liara.run/public/boy?username=${username}`
        const girlProfilePic = `https://avatar.iran.liara.run/public/girl?username=${username}`

        const newUser = new User({
            fullName,
            username,
            password: hashedPassword,
            gender,
            profilePic : gender === "male" ? boyProfilePic : girlProfilePic
        })

       if(newUser){
        //Generate JWT token 
        generateTokenSetCookie(newUser._id,res);
        await newUser.save(); // to save to the database

        res.status(201).json({ // created successfully status code
            _id: newUser._id, //this ield is put automatically
            fullName: newUser.fullName,
            username: newUser.username,
            profilePic: newUser.profilePic,
        })
       } else{
        res.status(400).json({error:'Invalid user data'});
       }
    } catch (error) {
        console.log('Error in signup controller',error.message);
        res.status(500).json({error:'Internal server error'});
    }
}
export const login = async(req,res)=>{
    try {
        const{username,password} = req.body;
        const user = await User.findOne({username});
        const isPasswordCorrect = await bcryptjs.compare(password,user.password || "");
        // Compares the entered password with that in the database, if no password exists for that user to compare with empty string
        if(!user || !isPasswordCorrect){
            return res.status(400).json({error:'Invalid username or password'});
        }
        generateTokenSetCookie(user._id,res);
    } catch (error) {
        console.log('Error in login controller',error.message);
        res.status(500).json({error:'Internal server error'});
        }
}
export const logout = async(req,res)=>{
     try {
        res.cookie('jwt',"",{maxAge:0})
        // clearing the cookie
        res.status(200).json({message:'Logged out successfully'})
     } catch (error) {
        console.log('Error in logout controller',error.message);
        res.status(500).json({error:'Internal server error'});
     }
}