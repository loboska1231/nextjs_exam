'use client'
import {createContext} from "react";

type contxt = {
    bool:boolean,
    switchBool: ( obj:boolean)=>void
}
export const init ={
    bool:false,
    switchBool: (obj:boolean)=> console.log(obj)
}
export const MyContext = createContext<contxt>(init)