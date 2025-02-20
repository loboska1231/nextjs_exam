'use client'
import Form from "next/form";
import {saveUser} from "@/server-actions/serverActions";
import {redirect} from "next/navigation";
import {useGetCookie} from "cookies-next";
import {useForm} from "react-hook-form";
import {joiResolver} from "@hookform/resolvers/joi";
import {validForm} from "@/components/validation/valid";
interface IUserForm {
    username: string,
    password:string,
    expiresInMins:number
}
const Login =   () => {
    const getCookie = useGetCookie()
    const user=  getCookie('user')
    const {
        register,
        formState:{
            errors, isValid
        }} = useForm<IUserForm>({
        mode:'all',
        resolver: joiResolver(validForm)
    })
    return (
        <div>
            {!user &&
                <Form
                    action={saveUser}>
                    <label >
                        <input
                            className={'text-black'}
                            type="text" {...register('username')}/>
                        {errors.username && <div>{errors.username?.message}</div> }
                    </label>
                    <label>
                        <input
                            className={'text-black'}
                            type="password" {...register('password')}/>
                        {errors.password && <div>{errors.password?.message}</div> }
                    </label>
                    <label >
                        <input
                            className={'text-black'}
                            type="number" {...register('expiresInMins')}/>
                        {errors.expiresInMins && <div>{errors.expiresInMins?.message}</div> }
                    </label>
                    <button
                        className={'border-2 border-solid border-blue-400  w-20'}
                        disabled={!isValid}>sign in</button>
                </Form>
            }
            {user && (redirect('/'))}
        </div>
    );
};
export default Login