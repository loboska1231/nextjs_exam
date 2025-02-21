'use client'
import {RecipeComponent} from "@/components/recipes/recipe-component/RecipeComponent";
import {FC, useEffect, useState} from "react";
import {IRecipe} from "@/models/recipes-models/IRecipe";

type pgType = {
    pg:string,
    token:string
}
export const RecipesComponent:FC<pgType> = ({pg,token}) => {
    const [recipes,setRecipes] = useState<IRecipe[]>([])
    useEffect(() => {
        fetch('http://localhost:3000/login/recipes/api',{headers:{
            page:pg,
                Authorization: 'Bearer '+ token
        }})
            .then(obj=> obj.json())
            .then(item=>setRecipes(item.recipes))
    }, [pg]);
    return (
        <div>
            {Array.isArray(recipes) && recipes?.map(recipe=><RecipeComponent key={recipe.id} recipe={recipe}/>)}
        </div>
    );
};