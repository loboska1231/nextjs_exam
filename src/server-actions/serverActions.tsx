'use server'

import {setCookie} from "cookies-next/server";
import {cookies} from "next/headers";
import {redirect} from "next/navigation";
import {login, refresh} from "@/services_n_helpers/api.service";

export const saveUser = async (formData:FormData)=>{
    const username = formData.get('username') as string;
    const password = formData.get('password')as string;
    const expiresInMins = formData.get('expiresInMin') as string || '60';
    const user = await login({username,password,expiresInMins} )

    await setCookie ('user',user,{cookies});
    redirect('/')
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



