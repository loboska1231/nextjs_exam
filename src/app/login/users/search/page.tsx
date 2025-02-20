import {SearchParams} from "next/dist/server/request/search-params";
import {FC} from "react";
import {ButtonComponent} from "@/components/back/ButtonComponent";
import {getSearchUsers, getUser} from "@/services_n_helpers/users.service";
import {UserComponent} from "@/components/users/user-component/UserComponent";

type props = {
    searchParams:Promise<SearchParams>
}

const Search :FC<props>= async ({searchParams}) => {
    const {q} = await searchParams;
    if(!q) return
    const data = (+q) ?await getUser(+q):await getSearchUsers(q)
    return (
        <div>
            {
                Array.isArray(data)
                    ? data.map(user=><UserComponent key={user.id} user={user}/> )
                    : <UserComponent key={data.id} user={data}/>
            }
            <ButtonComponent/>
        </div>
    );

};
export default Search
