import {SearchParams} from "next/dist/server/request/search-params";
import {parseParams} from "@/services_n_helpers/helpers";
import {IRecipe} from "@/models/recipes-models/IRecipe";
import {getUser} from "@/services_n_helpers/users.service";
import Link from "next/link";

type Props = {
    searchParams: Promise<SearchParams>
}
const RecipeDetailsComponent =async ({searchParams}:Props) => {
    const recipe = await parseParams<IRecipe>(searchParams);
    const user = await getUser(recipe.userId)
    const stringify = JSON.stringify({...user,password:'oleg'})
    return (
        <div>
            <h2>{recipe.name}</h2>
            <img style={{width:200}} src={recipe.image} alt={recipe.name}/>
            <p>rating - {recipe.rating}</p>
            <h3>tags</h3>
            <span>
                <ul>
                    {recipe.tags.map(tag=><li> - <Link href={{pathname:'/login/recipes/search',query:{tag:tag}} }> {tag} </Link></li>)}
                </ul>
            </span>
            <h3>meal-type</h3>
            <span>
                <ul>
                    {recipe.mealType.map(meal=><li>- {meal}</li> )}
                </ul>
            </span>
            <Link href={{pathname:'/login/users/'+user.id, query:{data:stringify}} }>{user.username}</Link>
        </div>
    );
};
export default RecipeDetailsComponent