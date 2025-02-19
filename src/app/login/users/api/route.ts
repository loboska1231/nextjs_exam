'use server'
import {getUsers} from "@/services_n_helpers/users.service";
import {redirect} from "next/navigation";
import {NextRequest, NextResponse} from "next/server";


export const GET= async (req:NextRequest)=>{
    const token = req.headers.get('Authorization') || '';
    const page = req.headers?.get('page') || 0
    const t = token.split(' ').pop()
    if(t){
        let res = new NextResponse();
        const users = await getUsers(t,+page).catch(()=>redirect('/refresh'));
        res = NextResponse.json({users})
        return res;
    }
    return Response.json({message:'TOKEN REQUIRED',status:401})
}