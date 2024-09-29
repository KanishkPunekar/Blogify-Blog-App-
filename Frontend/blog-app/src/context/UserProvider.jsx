import React, { useEffect, useState } from "react";
import userContext from "./userContext";
import { getCurrentUser, isLoggedIn } from "../auth";
function UserProvider({children}){
    const [user,setUser] = useState({
        data:{},
        login:false
    })
    useEffect(()=>{
        setUser({
            data:getCurrentUser(),
            login:isLoggedIn()

        })
    },[])

    

    return(
        <userContext.Provider value={{user,setUser}}>
            {
                children
            }
        </userContext.Provider>
    )
}

export default UserProvider