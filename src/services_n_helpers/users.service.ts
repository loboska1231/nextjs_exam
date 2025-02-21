'use server'
import {IUser} from "@/models/users-models/IUser";
import {RetriveCookie} from "@/services_n_helpers/helpers";
import {IUserWithTokens} from "@/models/users-models/IUserWithTokens";

export const getUsers = async (token:string,pg:number):Promise<IUser[]|null>=>{
    const obj = await fetch(`https://dummyjson.com/auth/users?skip=${!pg?0:pg*30}&limit=30`,{
        headers:{
            Authorization:  token
        },
    }).then(obj=>obj.json())
    if(obj.message)
        return null
    return obj.users
}
export const getUser = async (id:number):Promise<IUser>=>{
    const {accessToken} = await RetriveCookie<IUserWithTokens>('user');
    return await fetch('https://dummyjson.com/auth/users/'+id,{
        headers:{
            Authorization: 'Bearer ' + accessToken
        },
        credentials:'include'
    }).then(obj=>obj.json())
}
export const getSearchUsers = async (q:string):Promise<IUser[]>=>{
    const {accessToken} = await RetriveCookie<IUserWithTokens>('user');
    return await fetch(`https://dummyjson.com/auth/users/search?q=`+ q ,{
        headers:{
            Authorization: 'Bearer '+ accessToken
        }
    }).then(obj=>obj.json())
        .then(item=>{
            return item.users
        })
}