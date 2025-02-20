import {SearchParams} from "next/dist/server/request/search-params";
import {SearchComponent} from "@/components/search/SearchComponent";
import {Pagination} from "@/components/pagination/Pagination";
import {RecipesComponent} from "@/components/recipes/recipes-component/RecipesComponent";

type props = {
    searchParams:Promise<SearchParams>
}
const Recipes = async ({searchParams}:props) => {
    return (
        <>
            <SearchComponent/>
            <RecipesComponent searchParams={searchParams}/>
            <Pagination/>
        </>
    );
};
export default Recipes