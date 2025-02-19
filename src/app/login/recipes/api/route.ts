'use server'
import {getRecipes} from "@/services_n_helpers/recipes.service";
import {NextRequest, NextResponse} from "next/server";
import {redirect} from "next/navigation";

export const GET=async (req:NextRequest,res:NextResponse)=>{
    const token = req.headers.get('Authorization') || '';
    const page = req.headers?.get('page') || 0;
    const t = token.split(' ').pop();
    if(t){
        const recipes = await getRecipes(t,+page).catch(()=>redirect('/refresh'));
        res = NextResponse.json({recipes});
        return res
    }
    return Response.json({message:'TOKEN REQUIRED',status:401})
}
