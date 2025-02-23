'use client'
import Form from "next/form";
import {saveUser} from "@/server-actions/serverActions";
import {redirect} from "next/navigation";
import {useHasCookie} from "cookies-next";
import {useForm} from "react-hook-form";
import {joiResolver} from "@hookform/resolvers/joi";
import {validForm} from "@/components/validation/valid";
import {useContext} from "react";
import {MyContext} from "@/context/MyContext";

interface IUserForm {
    username: string,
    password:string,
    expiresInMins:number
}
const Login =   () => {
    const hasCookie = useHasCookie()
    const user = hasCookie('user')
    const {switchBool} = useContext(MyContext)
    if(user) switchBool(true)
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
                            className={'text-black border-solid border-black border'}
                            type="text" {...register('username')}
                            placeholder={'username'}
                        />
                        {errors.username && <div>{errors.username?.message}</div> }
                    </label>
                    <label>
                        <input
                            className={'text-black border-solid border-black border'}
                            type="password" {...register('password')}
                            placeholder={'password'}
                        />
                        {errors.password && <div>{errors.password?.message}</div> }
                    </label>
                    <label >
                        <input
                            className={'text-black border-solid border-black border'}
                            type="number" {...register('expiresInMins')}
                            placeholder={'expires in minutes'}
                        />
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