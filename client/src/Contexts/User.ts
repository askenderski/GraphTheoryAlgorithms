import {createContext} from "react";

export interface IUser {
    username: string
}

interface IUserContext {
    user?: IUser,
    setUser(user: IUser): void
}

const UserContext = createContext<IUserContext>({setUser: function(user: IUser) {return {username: ""};}});

export default UserContext;