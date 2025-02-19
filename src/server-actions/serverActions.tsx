'use server'

import {setCookie} from "cookies-next/server";
import {cookies} from "next/headers";
import {redirect} from "next/navigation";
import {IUserWithTokens} from "@/models/users-models/IUserWithTokens";
import {getCookie} from "cookies-next";
import {ITokens} from "@/models/token-model/ITokens";;
import axios from "axios";
import {axiosInstance, refresh} from "@/services_n_helpers/api.service";
import {RetriveCookie} from "@/services_n_helpers/helpers";

type formProps = {
    username:string,
    expiresInMin:string,
    password:string
}
export const saveUser = async (formData:FormData)=>{
    const username = formData.get('username');
    const password = formData.get('password');
    const expiresInMin = formData.get('expiresInMin') || 60;
    const user = await login({username,password,expiresInMin}as formProps)
    await setCookie ('user',user,{cookies});
    redirect('/')
}

const login = async ({username,expiresInMin,password}:formProps)=>{
    const t = +expiresInMin;
    return (await axiosInstance.post<IUserWithTokens>('/login',{username,password,t},{withCredentials:true})).data
}
export const refreshAction = async()=>{
    const store =await cookies()
    const oldUser = store.get('user')?.value
    const newUser = await refresh(oldUser)
    store.set('user',JSON.stringify(newUser))
    redirect('/')
}
export const deleteAction = async()=>{
    const store = await cookies()
    store.delete('user')
    redirect('/')
}



