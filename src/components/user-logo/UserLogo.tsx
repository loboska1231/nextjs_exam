import {RetriveCookie} from "@/services_n_helpers/helpers";
import {IUserWithTokens} from "@/models/users-models/IUserWithTokens";
import {logout} from "@/server-actions/serverActions";
import Form from "next/form";

export const UserLogo = async () => {
    const user = await RetriveCookie<IUserWithTokens>('user');
    return (
        <div>
            <h2>{user.username}</h2>
            <img src={user.image} style={{width:40}} alt="{user.username}"/>
            <Form action={logout}>
                <button
                    className={'border-solid border border-black'}>log out</button>
            </Form>
        </div>
    );
};