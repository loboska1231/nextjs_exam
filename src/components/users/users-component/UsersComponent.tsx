'use client'
import {IUser} from "@/models/users-models/IUser";
import {FC} from "react";
import {UserComponent} from "@/components/users/user-component/UserComponent";
type props = {
    users:IUser[]
}
export const UsersComponent:FC<props> = ({users}) => {

    return (
        <div>
            {users.map(user=><UserComponent key={user.id} user={user}/>)}
        </div>
    );
};