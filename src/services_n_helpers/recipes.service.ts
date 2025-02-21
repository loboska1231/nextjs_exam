import {IRecipe} from "@/models/recipes-models/IRecipe";
import {RetriveCookie} from "@/services_n_helpers/helpers";
import {IUserWithTokens} from "@/models/users-models/IUserWithTokens";
import {IRecipeResponse} from "@/models/recipes-models/IRecipeResponse";

export const getRecipes = async (token:string,pg:number):Promise<IRecipe[] | null>=>{
   const obj = await fetch(`https://dummyjson.com/auth/recipes?skip=${!pg?0:pg*30}&limit=30`,{
        headers:{
            Authorization: token
        }
    }).then(obj=>obj.json())
    if(obj.message)
        return null
    return obj.recipes

}
export const getRecipe = async (id:number):Promise<IRecipe>=>{
    const {accessToken} = await RetriveCookie<IUserWithTokens>('user');
    return await fetch(`https://dummyjson.com/auth/recipes/`+id,{
        headers:{
            Authorization: 'Bearer '+ accessToken
        }
    })
        .then(obj=>obj.json())
}
export const getSearchRecipesByName = async (q:string)=>{
    const {accessToken} = await RetriveCookie<IUserWithTokens>('user');
    return await fetch(`https://dummyjson.com/auth/recipes/search?q=`+q,{
        headers:{
            Authorization: 'Bearer '+ accessToken
        }
    })
        .then(obj=>obj.json())
        .then(item=>{
            return item.recipes
        })

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
            return recipes
        })
}
export const getSearchRecipesByTag= async (tag:string)=>{
    const {accessToken} = await RetriveCookie<IUserWithTokens>('user');
    console.log(accessToken)
    return await fetch('https://dummyjson.com/auth/recipes/tag/'+tag,{
        headers:{
            Authorization: 'Bearer '+ accessToken
        }
    }).then(obj => obj.json())
        .then(item=>{
            return item.recipes
        })
}
export const getUserRecipe = async (id:number):Promise<IRecipe>=>{
    const {accessToken} = await RetriveCookie<IUserWithTokens>('user');
    const {recipes}:IRecipeResponse = await fetch(`https://dummyjson.com/auth/recipes?limit=0`,{
        headers:{
            Authorization: 'Bearer ' + accessToken
        },
        credentials:'include'
    }).then(obj=>obj.json())
    return recipes.find(recipe=>recipe.userId==id)
}