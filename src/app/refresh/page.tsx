import {deleteAction, refreshAction} from "@/server-actions/serverActions";
import {getCookie} from "cookies-next";
import {cookies} from "next/headers";
import {redirect} from "next/navigation";

const RefreshPage = async () => {
    const cookie =await getCookie('user',{cookies})
    if(!cookie) redirect('/')
    return (
        <div>
            <h1>Your token is expired! Do you wanna refresh it?</h1>
            <form>
                <button formAction={refreshAction}>yes</button>
                <br/>
                <button formAction={deleteAction}>no</button>
            </form>
        </div>
    );
};
export default RefreshPage
