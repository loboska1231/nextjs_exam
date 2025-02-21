'use client'
import Form from "next/form";
import {usePathname} from "next/navigation";

export const SearchComponent = () => {
    const path = usePathname().split('/').pop()
    return (
        <div>
            <Form action={'/login/'+path+'/search'}>
                <input
                    className={'text-black'}
                    type="text" name={'q'}/>

                <button
                    className={'ml-1 border-2 border-solid border-red-400  w-20'}
                >search</button>
            </Form>
        </div>
    );
};