import { useState,useEffect } from "react";
import { createContext } from "react";

export const UserContext=createContext('UserContext');

const UserContextProvider=({children})=>{
    const [user,setUser]=useState(null)
    const [requestQty,setRequestQty]=useState([])
    useEffect(()=>{
        getLocalUser();
       },[])

    async function setLocalUser(userResponse){
        // console.log('=========data to set local storage===')
        // console.log(userResponse)
        localStorage.setItem("userProfile",JSON.stringify(userResponse))
        setUser(userResponse)
        // TODO:find a way to make local storage setitem happen in real time
    }
    function getLocalUser(){
        const item=JSON.parse(localStorage.getItem('userProfile'))
        if(item){
            setUser(item)
            // console.log('==========local user============')
            // console.log([item])
            return user
        }
    }
    function removeLocalUser(){
        localStorage.removeItem('userProfile')
        setUser(null)
    }

    return (
    <UserContext.Provider value={{setLocalUser,removeLocalUser,getLocalUser,setUser,user,setRequestQty,requestQty}}>
        {children}
    </UserContext.Provider>
    )
}

export default UserContextProvider;