//authenticate the user=>
    const LOCAL_STORAGE_KEY = "data";
export const isLoggedIn=()=>{
    let data = localStorage.getItem("data")
    if(data == null)
    {
        return false
    }
    else{
        return true
    }
}



//doLogin

export const doLogin=(data,next)=>{
    localStorage.setItem("data",JSON.stringify(data));
    next()
}



//do log out
export const doLogout = (next)=>{
    localStorage.removeItem("data")
    next()
}


// Get the current logged-in user
export const getCurrentUser = () => {
    if (isLoggedIn()) {
        const data = JSON.parse(localStorage.getItem("data"));
        return data.user ? data.user : undefined; // Ensure 'user' is available
    } else {
        return undefined;
    }
};


export const getToken = ()=>{
    if(isLoggedIn())
    {
        return JSON.parse(localStorage.getItem("data")).token
    }
    else{
        return null;
    }
}