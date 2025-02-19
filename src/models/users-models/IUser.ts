import {IHair} from "@/models/users-models/IHair";
import {Address} from "node:cluster";
import {IBank} from "@/models/users-models/IBank";
import {ICompany} from "@/models/users-models/ICompany";
import {ICrypto} from "@/models/users-models/ICrypto";

export interface IUser {
  id: number;
  firstName: string;
  lastName: string;
  maidenName: string;
  age: number;
  gender: string;
  email: string;
  phone: string;
  username: string;
  password: string;
  birthDate: string;
  image: string;
  bloodGroup: string;
  height: number;
  weight: number;
  eyeColor: string;
  hair: IHair;
  ip: string;
  address: Address;
  macAddress: string;
  university: string;
  bank: IBank;
  company: ICompany;
  ein: string;
  ssn: string;
  userAgent: string;
  crypto: ICrypto;
  role: string;
}