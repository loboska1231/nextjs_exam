import {SearchParams} from "next/dist/server/request/search-params";
import {RetriveCookie} from "@/services_n_helpers/helpers";
import {IUserWithTokens} from "@/models/users-models/IUserWithTokens";
import {redirect} from "next/navigation";
import {RecipeComponent} from "@/components/recipes/recipe-component/RecipeComponent";

type props = {
    searchParams:Promise<SearchParams>
}
export const RecipesComponent =async ({searchParams}:props) => {
    const cookie = await RetriveCookie<IUserWithTokens>('user')
    const {recipes} = await fetch('http://localhost:3000/login/recipes/api', {
        next:{revalidate:5},
        method:'GET',
        headers:{
            Authorization: 'Bearer '+ cookie.accessToken,
            page : (await searchParams)?.pg + ''
        },
        credentials:'include'
    }).then(obj=> obj.json()).catch(null)
    if(!recipes)  redirect('/refresh')
    return (
        <div>
            {Array.isArray(recipes) && recipes?.map(recipe=><RecipeComponent key={recipe.id} recipe={recipe}/>)}
        </div>
    );
};