import {SearchParams} from "next/dist/server/request/search-params";
import {FC} from "react";
import {ButtonComponent} from "@/components/ButtonComponent";
import {redirect} from "next/navigation";
import {
    getRecipeOfUser,
    getSearchRecipesByMeal,
    getSearchRecipesByName,
    getSearchRecipesByTag
} from "@/services_n_helpers/recipes.service";
import {RecipeComponent} from "@/components/recipes/recipe-component/RecipeComponent";

type props = {
    searchParams:Promise<SearchParams>
}

const Search :FC<props>= async ({searchParams}) => {
    const {q} = await searchParams;
    if(!q) return
    let data;
    if(+q) data = await getRecipeOfUser(+q)
    else {
        data = await getSearchRecipesByName(q)
        if(data == false){
            data = await getSearchRecipesByTag(q)
        }
        if(data== false){
            data= await getSearchRecipesByMeal(q)
        }
    }
    // выглядит страшненько
    return (
        <div>
            {
                Array.isArray(data)
                    ? data.map(recipe=><RecipeComponent key={recipe.id} recipe={recipe}/> )
                    : (data
                        ? <RecipeComponent key={data.id} recipe={data}/>
                        : <p>no recipes with this search param</p>
                    )
            }
            <ButtonComponent/>
        </div>
    );

};
export default Search
