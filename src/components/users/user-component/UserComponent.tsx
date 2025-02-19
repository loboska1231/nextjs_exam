import {FC} from "react";
import {IUser} from "@/models/users-models/IUser";
import Link from "next/link";
type props = {user:IUser}
export const UserComponent:FC<props> = ({user}) => {
    const stringify = JSON.stringify({...user,password:'oleg'});
    return (
        <div>
            <Link href={{pathname:'/login/users/' + user.id ,query:{data:stringify} }} >
                {user.id}, {user.username}
            </Link>
        </div>
    );
};