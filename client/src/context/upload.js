import { createContext, useState } from "react";

export const uploadContext = createContext();

export const StatusProvider =(props)=>{
    const [upload,setUpload]=useState({status:false,url:'xyz'});
    return (
        <uploadContext.Provider value={{upload,setUpload}}>
            {props.children}
        </uploadContext.Provider>
    )
}