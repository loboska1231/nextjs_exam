'use server'

import {setCookie} from "cookies-next/server";
import {cookies} from "next/headers";
import {redirect} from "next/navigation";
import {login} from "@/services_n_helpers/api.service";
import {deleteCookie} from "cookies-next/server";

export const saveUser = async (formData:FormData)=>{
    const username = formData.get('username') as string;
    const password = formData.get('password')as string;
    const expiresInMins = formData.get('expiresInMin') as string || '60';
    const user = await login({username,password,expiresInMins} )
    await setCookie ('user',JSON.stringify(user),{cookies});
    redirect('/')
}
export const logout = async ()=>{
    await deleteCookie('user',{cookies})
    redirect('/')
}



