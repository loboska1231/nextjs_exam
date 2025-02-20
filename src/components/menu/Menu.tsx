import Link from "next/link";
import {getCookie} from "cookies-next";
import {cookies} from "next/headers";
import {UserLogo} from "@/components/user-logo/UserLogo";


export const Menu =async () => {
    const value = await getCookie('user', {cookies})
    return (
        <div>
            <ul className={'text-blue-400'}>
                {!value && <li><Link href={'/login'}>login</Link></li>}

                {
                    value &&
                    <>
                        <UserLogo/>
                        <li><Link href={'/login/users'}>users</Link></li>
                        <li><Link href={'/login/recipes'}>recipes</Link></li>
                    </>
                }
            </ul>
            <hr/>
        </div>
    );
};