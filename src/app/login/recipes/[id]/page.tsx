import {SearchParams} from "next/dist/server/request/search-params";
import {Metadata} from "next";
import RecipeDetailsComponent from "@/components/recipes/recipe-details-component/RecipeDetailsComponent";

type Props = {
    params: Promise<{ id: string }>,
    searchParams: Promise<SearchParams>
}
export const generateMetadata = async ({params}: Props): Promise<Metadata> => {
    const {id} = await params
    return {
        title: 'Recipe' + id,
        description: 'Recipe ' + id + ' page title'
    }
}
const RecipeById = async ({searchParams}:Props) => {
    return (
        <>
            <RecipeDetailsComponent searchParams={searchParams}/>
        </>
    );
};
export default RecipeById