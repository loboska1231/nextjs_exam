import {UserComponent} from "@/components/users/user-component/UserComponent";
import {RetriveCookie} from "@/services_n_helpers/helpers";
import {IUserWithTokens} from "@/models/users-models/IUserWithTokens";
import {SearchParams} from "next/dist/server/request/search-params";
import {Pagination} from "@/components/pagination/Pagination";
import {SearchComponent} from "@/components/search/SearchComponent";

type props = {
    searchParams:Promise<SearchParams>
}
const Users = async ({searchParams}:props) => {
    const {users} = await fetch('http://localhost:3000/login/users/api', {
        next:{revalidate:5},
        method:'GET',
        headers:{
            Authorization: 'Bearer '+ (await RetriveCookie<IUserWithTokens>('user')).accessToken,
            page : (await searchParams)?.pg + ''
        },
        credentials:'include'
    }).then(obj=>obj.json())
    return (
        <div>
            <SearchComponent/>
            {Array.isArray(users) &&  users?.map(user=><UserComponent key={user.id} user={user}/>)}
            <Pagination/>
        </div>
    );
};
export default Users

