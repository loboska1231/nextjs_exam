import {IRecipe} from "@/models/recipes-models/IRecipe";
import {FC} from "react";
import Link from "next/link";

type props = {recipe:IRecipe}
export const RecipeComponent:FC<props> = ({recipe}) => {
    const stringify = JSON.stringify(recipe);
    return (
        <div>
            <Link href={{pathname:'/login/recipes/' + recipe.id ,query:{data:stringify} }} >
                {recipe.id}, {recipe.name}
            </Link>
        </div>
    );
};