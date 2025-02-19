import {getCookie} from "cookies-next";
import {cookies} from "next/headers";
import {SearchParams} from "next/dist/server/request/search-params";

export const RetriveCookie =async  <T> (key:string)=>{
    const cookie= await getCookie(key,{cookies})
    if(!cookie) return {} as T
    return JSON.parse(cookie) as T
}
export const parseParams = async <T>(searchParams:Promise<SearchParams>)=>{
    const {data} = await searchParams
    if(!data) return {} as T
    return JSON.parse(data+'') as T
}