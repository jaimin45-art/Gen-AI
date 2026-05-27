//hooks layer manage state and api layer

import { useContext } from "react";
import { AuthContext } from "../auth.context";
import { login,register,logout,getMe } from "../services/auth.api";

export const useAuth = () =>{
    const context = useContext(AuthContext)
    const {user,setUser,loading,setLoading} = context

    const handleLogin = async ({email,password}) =>{
        setLoading(true)
        try{
        const data = await login({email,password})
        setUser(data.user)
        }catch(err){
            console.log(err)
        }finally{

            setLoading(false)
        }
    }

    const handleRegister = async ({username,email,password}) =>{
        setLoading(true)
        const data = await register({username,email,password})
        setUser(data.user) //in backend data return with user
        setLoading(false)
    }
    const handleLogout = async ()=>{
        setLoading(true)
        const data = await logout()
        setUser(null) //remove user from frontend
        setLoading(false)
    }

    return {user,loading,handleRegister,handleLogin,handleLogout}
}