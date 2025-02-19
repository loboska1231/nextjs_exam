'use client'
import Form from "next/form";
import {usePathname} from "next/navigation";

export const SearchComponent = () => {
    const path = usePathname().split('/').pop()
    return (
        <div>
            <Form action={'/login/'+path+'/search'}>
                <input type="text" name={'q'}/>
                <button>search</button>
            </Form>
        </div>
    );
};