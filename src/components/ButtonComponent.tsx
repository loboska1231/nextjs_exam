'use client'
import {useRouter} from "next/navigation";

export const ButtonComponent = () => {
    const router = useRouter()
    return (
        <>
            <button onClick={()=>router.back()}>back</button></>
    );
};