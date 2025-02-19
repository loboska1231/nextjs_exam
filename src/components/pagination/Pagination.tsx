'use client'
import {redirect, usePathname, useSearchParams} from "next/navigation";
import {headers} from "next/headers";

export const Pagination =  () => {
    const searchParams = useSearchParams()
    const path = usePathname()
    const endPoint = usePathname().split('/').pop()
    const pg = searchParams.get('pg') || '0'
    return (
        <div>
            <button onClick={()=>{
                if(pg && +pg>=1){
                    let couter = +pg;
                    redirect(path+'?pg='+(--couter))
                }
            }} disabled={(+pg==0)}>prev</button>
            <button onClick={()=>{
                if(pg && +pg<(endPoint=='users'?6 : 2)){
                    let couter = +pg;
                    redirect(path+'?pg='+(++couter))
                }
            }} disabled={(+pg==(endPoint=='users'?6 : 2))}>next</button>
        </div>
    );
};