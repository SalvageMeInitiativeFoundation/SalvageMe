import { useState,useEffect } from "react";
import { createContext } from "react";

export const UserContext=createContext('UserContext');

const UserContextProvider=({children})=>{
    const [user,setUser]=useState([])
    useEffect(()=>{
        getLocalUser();
       },[])

    function setLocalUser(userResponse){
        localStorage.setItem('userProfile',JSON.stringify(userResponse))
        setUser([userResponse])
    }
    function getLocalUser(){
        const item=JSON.parse(localStorage.getItem('userProfile'))
        if(item){
            setUser(item)
            console.log(user)
            return user
        }
    }
    function removeLocalUser(){
        localStorage.removeItem('userProfile')
        setUser([])
    }

    return (<UserContext.Provider value={{setLocalUser,removeLocalUser,getLocalUser,setUser,user}}>
        {children}
    </UserContext.Provider>)
}

export default UserContextProvider;