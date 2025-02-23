import Link from "next/link";
import {hasCookie} from "cookies-next";
import {cookies} from "next/headers";
import {UserLogo} from "@/components/user-logo/UserLogo";


export const Menu = async () => {
    const bool = await hasCookie('user',{cookies})
    return (
        <div>
            <ul className={'text-blue-400'}>
                {!bool && <li><Link href={'/login'}>login</Link></li>}

                {
                    bool &&
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