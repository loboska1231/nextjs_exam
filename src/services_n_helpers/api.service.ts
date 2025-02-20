'use server'
import axios from "axios";
import {ITokens} from "@/models/token-model/ITokens";
import {IUserWithTokens} from "@/models/users-models/IUserWithTokens";
import {redirect} from "next/navigation";

export const axiosInstance = axios.create({
    baseURL:'https://dummyjson.com/auth',
    headers:{},
    withCredentials:true
})
type formProps = {
    username:string,
    expiresInMins:string,
    password:string
}
export const login = async ({username,expiresInMins,password}:formProps)=>{
    const t = +expiresInMins;
    return (await axiosInstance.post<IUserWithTokens>('/login',{username,password,t}).catch(()=>redirect('/login'))).data
}
export const refresh = async (cookie:string)=>{
    const user = JSON.parse(cookie) as IUserWithTokens
    const {data:{accessToken,refreshToken}} = await axiosInstance.post<ITokens>('/refresh',{
        refreshToken: user.refreshToken
    })
    user.accessToken = accessToken
    user.refreshToken = refreshToken
    return user

}