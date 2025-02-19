import {IUser} from "@/models/users-models/IUser";

export interface IUserResponse{
    users:IUser[],
    total:number,
    skip:number,
    limit:number,
}