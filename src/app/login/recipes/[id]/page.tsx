import {SearchParams} from "next/dist/server/request/search-params";
import {parseParams} from "@/services_n_helpers/helpers";
import {IRecipe} from "@/models/recipes-models/IRecipe";
import {getUser} from "@/services_n_helpers/users.service";
import Link from "next/link";
import {Metadata} from "next";

type Props = {
    params: Promise<{ id: string }>,
    searchParams: Promise<SearchParams>
}
export const generateMetadata = async ({params}: Props): Promise<Metadata> => {
    const {id} = await params
    return {
        title: 'Recipe page title' + id
    }
}
const RecipeById = async ({searchParams}:Props) => {
    const recipe = await parseParams<IRecipe>(searchParams);
    const user = await getUser(recipe.userId)
    const stringify = JSON.stringify({...user,password:'oleg'})
    return (
        <div>
            <h2>{recipe.name}</h2>
            <img style={{width:140}} src={recipe.image} alt={recipe.name}/>
            <p>rating - {recipe.rating}</p>
            <span>
                <ul>
                    <h3>tags</h3>
                    {recipe.tags.map(tag=><li>{tag}</li> )}
                </ul>
            </span>
            <Link href={{pathname:'/login/users/'+user.id, query:{data:stringify}} }>{user.username}</Link>
        </div>
    );
};
export default RecipeById