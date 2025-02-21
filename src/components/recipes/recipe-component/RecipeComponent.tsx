import {IRecipe} from "@/models/recipes-models/IRecipe";
import {FC} from "react";
import Link from "next/link";

type props = {recipe:IRecipe}
export const RecipeComponent:FC<props> = ({recipe}) => {
    const stringify = JSON.stringify(recipe);
    return (
        <div
            className={'border-2 border-solid border-blue-400 w-3/12 m-1 ml-0'}
        >
            <p>
                <Link href={{pathname:'/login/recipes/' + recipe.id ,query:{data:stringify} }} >
                {recipe.name}
            </Link>
            </p>
            <span>tags &#8595; (search by tag)</span>
            <ul
                key={recipe.id}
                className={'text-red-400'}
            >
                {recipe.tags.map(tag=><li key={tag}><Link href={{pathname:'/login/recipes/search',query:{tag:tag}} }> {tag} </Link></li>)}
            </ul>

        </div>
    );
};