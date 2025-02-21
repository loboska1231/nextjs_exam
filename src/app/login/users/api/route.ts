'use server'
import {getUsers} from "@/services_n_helpers/users.service";
import {NextRequest, NextResponse} from "next/server";
import {IUserWithTokens} from "@/models/users-models/IUserWithTokens";
import {refresh} from "@/services_n_helpers/api.service";

export const GET= async (request:NextRequest)=>{
    console.log(request.cookies.has('user'))
    if(request.cookies.has('user') && request.cookies.get('user')?.value){
        const token = request.headers.get('Authorization')
        const page = request.headers.get('page')

        let users = await getUsers(token,+page);
        if(!users){
            console.log('refresh')
            const cookieUser = JSON.parse(request.cookies.get('user')?.value) as IUserWithTokens
            const newUser = await refresh(cookieUser)
            users = await getUsers(newUser.accessToken,+page)
            const response = NextResponse.json({users})
            response.cookies.set('user',JSON.stringify(newUser))
            return response
        }
        return Response.json({users})
    }
    return Response.json({message:'no cookie auth',status:401})
}