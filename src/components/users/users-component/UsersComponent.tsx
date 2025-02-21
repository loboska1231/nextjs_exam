'use client'
import {UserComponent} from "@/components/users/user-component/UserComponent";
import {FC, useEffect, useState} from "react";
import {IUser} from "@/models/users-models/IUser";

type pgType = {
    pg:string,
    token:string
}
const UsersComponent:FC<pgType> =  ({pg,token}) => {
    const [users,setUsers] = useState<IUser[]>([]);
    useEffect(() => {
        fetch('http://localhost:3000/login/users/api',{headers:{
            page:pg,
                Authorization: 'Bearer '+token
        }})
            .then(obj=> obj.json())
            .then(item=>setUsers(item.users))
    }, [pg]);
    return (
        <div>
            {Array.isArray(users) &&  users?.map(user=><UserComponent key={user.id} user={user}/>)}
        </div>
    );
};
export default UsersComponent