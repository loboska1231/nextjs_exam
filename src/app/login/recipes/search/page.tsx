import {SearchParams} from "next/dist/server/request/search-params";
import {FC} from "react";
import {ButtonComponent} from "@/components/back/ButtonComponent";
import {
    getRecipe,
    getSearchRecipesByMeal,
    getSearchRecipesByName,
    getSearchRecipesByTag
} from "@/services_n_helpers/recipes.service";
import {RecipeComponent} from "@/components/recipes/recipe-component/RecipeComponent";
import {redirect} from "next/navigation";

type props = {
    searchParams:Promise<SearchParams>
}

const Search :FC<props>= async ({searchParams}) => {
    const {q} = await searchParams;
    const {tag} = await searchParams;
    if(!q && !tag) {
        redirect('/login/recipes')
    }
    let data;
    if(+q && !tag) {
        data = await getRecipe(+q)
        console.log(tag)
        console.log(q)
        console.log('1')
    }
    else if(tag){
        data = await getSearchRecipesByTag(tag)
    }
    else {
        data = await getSearchRecipesByName(q)
        console.log('2')
        if(data == false){
            data = await getSearchRecipesByTag(q)
            console.log('3')
        }
        if(data== false){
            data= await getSearchRecipesByMeal(q)
            console.log('4')
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
