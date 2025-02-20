import {Metadata} from "next";
import {SearchParams} from "next/dist/server/request/search-params";
import UserDetailsComponent from "@/components/users/user-details-component/UserDetailsComponent";

type Props = {
    params: Promise<{ id: string }>,
    searchParams: Promise<SearchParams>
}
export const generateMetadata = async ({params}: Props): Promise<Metadata> => {
    const {id} = await params
    return {
        title: 'user page ' + id,
        description: ' user '+ id+' page'
    }
}
const UserById = async ({searchParams}:Props) => {
    return (
        <>
            <UserDetailsComponent searchParams={searchParams}/>
        </>
    );
};
export default  UserById