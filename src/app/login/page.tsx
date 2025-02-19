import Form from "next/form";
import {saveUser} from "@/server-actions/serverActions";
import {redirect} from "next/navigation";
import {getCookie} from "cookies-next";
import {cookies} from "next/headers";

const Login = async  () => {
    const user= await getCookie('user',{cookies})
    return (
        <div>
            {!user &&
                <Form action={saveUser}>
                    <input type="text" name={'username'}/>
                    <input type="password" name={'password'}/>
                    <input type="number" name={'expiresInMin'}/>
                    <button>sign in</button>
                </Form>
            }
            {user && (redirect('/'))}
        </div>
    );
};
export default Login