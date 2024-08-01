import jwt from 'jsonwebtoken';

const generateTokenSetCookie = (userId,res)=>{
    const token = jwt.sign({userId},process.env.JWT_SECRET,{
        expiresIn: '15d'
    })
    res.cookie('jwt',token,{
        maxAge: 15*24*60*60*1000,
        //Now adding security 
        httpOnly: true, // prevent XSS attacks -> cross site scripting attacks -> cookies not accessible by JS
        sameSite: "strict",//CSRF attacks cross site request forgery attacks
        secure: process.env.NODE_ENV !== 'developement'
        /*
        secure -> false -> if you're in developement(localhost)
               -> true  -> if your're in production 
        */
    })
}
export default generateTokenSetCookie;