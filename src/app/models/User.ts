import { Role } from './Role';

export class User {
    id: Number;
    firstname : string;
    username : string;
    lastname : string;
    email: string;
    password: string;
    loggedIn: boolean;
    role: number;
    ConnectedUser : number;
}