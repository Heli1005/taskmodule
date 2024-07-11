import React, { createContext, useContext, useState } from "react";
import UseLocalStorage from "../commonComponents/useLocalStorage";

const UserContext = createContext()

const Authentication = ({ children }) => {

    const [currentUser, setCurrentUser] = UseLocalStorage('currentuser', null)
    const [user, setUser] = useState(currentUser ? currentUser:null);

    const handlLogin = (userObj) => {
        setUser(userObj)
    }

    const handleLogOut = () => {
        setUser(null)
    }

    return <UserContext.Provider value={{ user, handlLogin, handleLogOut }}>{children}</UserContext.Provider>;
};

export default Authentication;

const useAuth = () => {
    return useContext(UserContext)
}

export { useAuth }