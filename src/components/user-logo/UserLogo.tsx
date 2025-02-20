import {RetriveCookie} from "@/services_n_helpers/helpers";
import {IUserWithTokens} from "@/models/users-models/IUserWithTokens";

export const UserLogo = async () => {
    const user = await RetriveCookie<IUserWithTokens>('user');
    return (
        <div>
            <h2>{user.username}</h2>
            <img src={user.image} style={{width:40}} alt="{user.username}"/>
        </div>
    );
};