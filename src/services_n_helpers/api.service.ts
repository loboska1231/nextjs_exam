'use server'
import axios from "axios";
import {ITokens} from "@/models/token-model/ITokens";
import {setCookie} from "cookies-next/server";
import {cookies} from "next/headers";
import {IUserWithTokens} from "@/models/users-models/IUserWithTokens";
import {getCookie} from "cookies-next";

export const axiosInstance = axios.create({
    baseURL:'https://dummyjson.com/auth',
    headers:{},
    withCredentials:true
})
export const refresh = async (cookie:string)=>{
    const user = JSON.parse(cookie) as IUserWithTokens
    const {data:{accessToken,refreshToken}} = await axiosInstance.post<ITokens>('/refresh',{
        refreshToken: user.refreshToken
    })
    user.accessToken = accessToken
    user.refreshToken = refreshToken
    return user

}