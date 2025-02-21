import {SearchParams} from "next/dist/server/request/search-params";
import {SearchComponent} from "@/components/search/SearchComponent";
import {Pagination} from "@/components/pagination/Pagination";
import {RecipesComponent} from "@/components/recipes/recipes-component/RecipesComponent";
import {getCookie} from "cookies-next";
import {cookies} from "next/headers";
import {redirect} from "next/navigation";
import {IUserWithTokens} from "@/models/users-models/IUserWithTokens";

type props = {
    searchParams:Promise<SearchParams>
}
const Recipes = async ({searchParams}:props) => {
    const sp = await searchParams
    const pg = sp.pg?.toString()
    if(! await getCookie('user',{cookies})) redirect('/login')
    const cookie = await getCookie('user',{cookies});
    const user = JSON.parse(cookie) as IUserWithTokens
    return (
        <>
            <SearchComponent/>
            <RecipesComponent pg={pg||'0'} token={user.accessToken}/>
            <Pagination/>
        </>
    );
};
export default Recipes