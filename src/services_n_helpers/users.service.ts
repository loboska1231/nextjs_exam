'use server'
import {IUser} from "@/models/users-models/IUser";
import {axiosInstance} from "@/services_n_helpers/api.service";
import {IUserResponse} from "@/models/users-models/IUserResponse";
import {RetriveCookie} from "@/services_n_helpers/helpers";
import {IUserWithTokens} from "@/models/users-models/IUserWithTokens";
import {redirect} from "next/navigation";

export const getUsers = async (token:string,pg:number):Promise<IUser[]>=>{
    return await fetch(`https://dummyjson.com/auth/users?skip=${!pg?0:pg*30}&limit=30`,{
        headers:{
            Authorization: 'Bearer ' + token
        },
        credentials:'include'
    }).then(obj=>obj.json())
        .then(item=>{
            const {users} = item
            return users
        })
}
export const getUser = async (id:number):Promise<IUser>=>{
    const {accessToken} = await RetriveCookie<IUserWithTokens>('user');
    return await fetch('https://dummyjson.com/auth/users/'+id,{
        headers:{
            Authorization: 'Bearer ' + accessToken
        },
        credentials:'include'
    }).then(obj=>obj.json()).catch(()=>redirect('/refresh'))
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
        }).catch(()=>redirect('/refresh'))

}