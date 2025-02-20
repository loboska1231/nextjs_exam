import {SearchParams} from "next/dist/server/request/search-params";
import {Pagination} from "@/components/pagination/Pagination";
import {SearchComponent} from "@/components/search/SearchComponent";
import UsersComponent from "@/components/users/users-component/UsersComponent";

type props = {
    searchParams:Promise<SearchParams>
}
const Users = async ({searchParams}:props) => {
    return (
        <div>
            <SearchComponent/>
            <UsersComponent searchParams={searchParams}/>
            <Pagination/>
        </div>
    );
};
export default Users

