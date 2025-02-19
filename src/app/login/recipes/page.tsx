import {RetriveCookie} from "@/services_n_helpers/helpers";
import {IUserWithTokens} from "@/models/users-models/IUserWithTokens";
import {SearchParams} from "next/dist/server/request/search-params";
import {SearchComponent} from "@/components/search/SearchComponent";
import {Pagination} from "@/components/pagination/Pagination";
import {RecipeComponent} from "@/components/recipes/recipe-component/RecipeComponent";
import {parse} from "cookie";
import {setCookie} from "cookies-next/server";
import {cookies} from "next/headers";
import {redirect} from "next/navigation";

type props = {
    searchParams:Promise<SearchParams>
}
const Recipes = async ({searchParams}:props) => {
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
        <>
            <SearchComponent/>
            {Array.isArray(recipes) && recipes?.map(recipe=><RecipeComponent key={recipe.id} recipe={recipe}/>)}
            <Pagination/>
        </>
    );
};
export default Recipes