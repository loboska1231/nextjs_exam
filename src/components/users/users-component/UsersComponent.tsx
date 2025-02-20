import {UserComponent} from "@/components/users/user-component/UserComponent";
import {RetriveCookie} from "@/services_n_helpers/helpers";
import {IUserWithTokens} from "@/models/users-models/IUserWithTokens";
import {SearchParams} from "next/dist/server/request/search-params";

type props = {
    searchParams:Promise<SearchParams>
}
const UsersComponent = async ({searchParams}:props) => {
    const {users} = await fetch('http://localhost:3000/login/users/api', {
        next:{revalidate:5},
        method:'GET',
        headers:{
            Authorization: 'Bearer '+ (await RetriveCookie<IUserWithTokens>('user')).accessToken,
            page : (await searchParams)?.pg +''
        },
        credentials:'include'
    }).then(obj=>obj.json())
    return (
        <div>
            {Array.isArray(users) &&  users?.map(user=><UserComponent key={user.id} user={user}/>)}
        </div>
    );
};
export default UsersComponent