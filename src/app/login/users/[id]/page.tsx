import {Metadata} from "next";
import {SearchParams} from "next/dist/server/request/search-params";
import {IUser} from "@/models/users-models/IUser";
import {parseParams, RetriveCookie} from "@/services_n_helpers/helpers";
import Image from "next/image";
import {IUserWithTokens} from "@/models/users-models/IUserWithTokens";
import {getRecipeOfUser} from "@/services_n_helpers/recipes.service";
import Link from "next/link";

type Props = {
    params: Promise<{ id: string }>,
    searchParams: Promise<SearchParams>
}
export const generateMetadata = async ({params}: Props): Promise<Metadata> => {
    const {id} = await params
    return {
        title: 'user page ' + id,
    }
}
const UserById = async ({searchParams}:Props) => {
    const user = await parseParams<IUser>(searchParams)
    const recipe = await getRecipeOfUser(user.id)
    const stringify = JSON.stringify(recipe)
    return (
        <div>
            <h2>{user.username}</h2>
            <img src={user.image} alt={user.username}/>
            <p>{user.firstName},{user.lastName},{user.maidenName},age - {user.age}</p>
            <p>{user.bank.cardType} - {user.bank.currency}</p>
            <p>{user.company.title} - {user.company.department}</p>
            <p>{user.university} </p>
            <p>{user.email}</p>
            {
                recipe ? <Link href={{pathname:'/login/recipes/'+recipe.id,query:{data:stringify}} }>{recipe.name}</Link>
                    : <p>don`t have recipe</p>
            }

        </div>
    );
};
export default  UserById