import { useState } from "react"
import toast from "react-hot-toast";
import { useAuthContext } from "../context/AuthContext";

const useSignup = () => {
    const [loading,setLoading] = useState(false);
    const {setAuthUser} = useAuthContext(); /*Destructuring allows you to extract properties from objects or elements from arrays more conveniently.When you use {} with destructuring, you are working with objects.This line of code extracts the setAuthUser function from the object returned by useAuthContext and assigns it to the setAuthUser variable. */

    const signup = async ({fullName,username,password,confirmPassword,gender})=>{
    const success = handleInputErrors({fullName,username,password,confirmPassword,gender})
    if(! success) return ;
    setLoading(true);
    try {
        const res = await fetch('/api/auth/signup',{ //we are able to write route like this since we have added "proxy" to vite.config.js
            method:"POST",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify({fullName,username,password,confirmPassword,gender})
        })

        const data = await res.json();{/*A POST appears , you need to fix it in the developement itself */}
        if(data.error){
            throw new Error(data.error)
        }
        //local storage -> to know if we are logged in or not
        localStorage.setItem('chat-user',JSON.stringify(data))
        //context  -> If logged in so navigate the user to the homepage
        setAuthUser(data);

    } catch (error) {
        toast.error(error.message)
    } finally{
        setLoading(false)
    }
    }
    return {loading,signup}
}

export default useSignup

function handleInputErrors({fullName,username,password,confirmPassword,gender}){
    if(!fullName || !username || !password || !confirmPassword ||!gender){
        toast.error('Please fill in all fields')
        return false
    }
    if(password !== confirmPassword){
        toast.error('Password do not match') //Now we are handling errors on both client and server side double checks => both in frontend and in backend
        return false
    }
    if(password.length < 6){
        toast.error('Password must have atleast 6 characters')
        return false
    }
    return true
}