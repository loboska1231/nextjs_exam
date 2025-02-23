'use client'
import Form from "next/form";
import {usePathname} from "next/navigation";

export const SearchComponent = () => {
    const path = usePathname().split('/').pop()
    let t;
    if(path == 'users') t ='id, name'
    else t = 'id, name, meal-type'
    return (
        <div>
            <Form action={'/login/'+path+'/search'}>
                <input
                    className={'text-black border-black border border-solid'}
                    type="text" name={'q'}
                    placeholder={t}
                />

                <button
                    className={'ml-1 border-2 border-solid border-red-400  w-20'}
                >search</button>
            </Form>
        </div>
    );
};