import {IAddress} from "@/models/users-models/IAddress";


export interface ICompany {
    department: string;
    name: string;
    title: string;
    address: IAddress;
}