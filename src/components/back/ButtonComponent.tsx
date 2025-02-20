'use client'
import {useRouter} from "next/navigation";

export const ButtonComponent = () => {
    const router = useRouter()
    return (
        <>
            <button className={'text-blue-400'} onClick={()=>router.back()}>back</button></>
    );
};