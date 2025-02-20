import {IRecipe} from "@/models/recipes-models/IRecipe";
import {RetriveCookie} from "@/services_n_helpers/helpers";
import {IUserWithTokens} from "@/models/users-models/IUserWithTokens";
import {IRecipeResponse} from "@/models/recipes-models/IRecipeResponse";
import {redirect} from "next/navigation";

export const getRecipes = async (token:string,pg:number):Promise<IRecipe[]>=>{
    return await fetch(`https://dummyjson.com/auth/recipes?skip=${!pg?0:pg*30}&limit=30`,{
        headers:{
            Authorization: 'Bearer ' + token
        },
        credentials:'include'
    }).then(obj=>obj.json())
        .then(item=>{
            const {recipes} = item
            return recipes
        })
}
export const getRecipe = async (id:number):Promise<IRecipe>=>{
    const {accessToken} = await RetriveCookie<IUserWithTokens>('user');
    return await fetch(`https://dummyjson.com/auth/recipes/`+id,{
        headers:{
            Authorization: 'Bearer ' + accessToken
        },
        credentials:'include'
    }).then(obj=>obj.json())
        .catch(()=>redirect('/refresh'))
}
export const getSearchRecipesByName = async (q:string)=>{
    const {accessToken} = await RetriveCookie<IUserWithTokens>('user');
    return await fetch(`https://dummyjson.com/auth/recipes/search?q=`+q,{
        headers:{
            Authorization: 'Bearer '+ accessToken
        }
    }).then(obj=>obj.json())
        .then(item=>{
            const {recipes} = item;
            return recipes
        })
        .catch(()=>redirect('/refresh'))
}
export const getSearchRecipesByMeal= async (q:string)=>{
    const {accessToken} = await RetriveCookie<IUserWithTokens>('user');
    return await fetch('https://dummyjson.com/recipes/meal-type/'+q,{
        headers:{
            Authorization: 'Bearer '+ accessToken
        }
    }).then(obj => obj.json())
        .then(item=>{
            const {recipes} = item;
            console.log(recipes)
            return recipes
        })
        .catch(()=>redirect('/refresh'))
}
export const getSearchRecipesByTag= async (tag:string)=>{
    const {accessToken} = await RetriveCookie<IUserWithTokens>('user');
    return await fetch('https://dummyjson.com/recipes/tag/'+tag,{
        headers:{
            Authorization: 'Bearer '+ accessToken
        }
    }).then(obj => obj.json())
        .then(item=>{
            const {recipes} = item;
            return recipes
        })
        .catch(()=>redirect('/refresh'))
}
export const getUserRecipe = async (id:number):Promise<IRecipe>=>{
    const {accessToken} = await RetriveCookie<IUserWithTokens>('user');
    const {recipes}:IRecipeResponse = await fetch(`https://dummyjson.com/auth/recipes?limit=0`,{
        headers:{
            Authorization: 'Bearer ' + accessToken
        },
        credentials:'include'
    }).then(obj=>obj.json())
        .catch(()=>redirect('/refresh'))
    return recipes.find(recipe=>recipe.userId==id)
}