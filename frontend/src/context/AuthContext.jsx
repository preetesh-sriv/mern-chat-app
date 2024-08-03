import { createContext, useContext, useState } from "react";

export const AuthContext = createContext();

export const useAuthContext =()=>{
    return useContext(AuthContext) 
    {/*To be able to consume below values we use this hook  */}
}

export const AuthContextProvider = ({children})=>{
    const [authUser,setAuthUser] = useState(JSON.parse(localStorage.getItem('chat-user')) || null)
    return <AuthContext.Provider value={{authUser,setAuthUser}}>
        {children}   {/*We will wrap our application with AuthCOntext provider so that our entire application has those values */}
    </AuthContext.Provider>
}