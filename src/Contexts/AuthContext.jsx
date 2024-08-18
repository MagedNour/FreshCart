import { createContext, useEffect, useState } from "react";


export const AuthContext = createContext();


export default function AuthContextProvider({ children }) {

    const [userToken, setUserToken] = useState("");

    useEffect(() => {
        if (localStorage.getItem("token") != null) {
            setUserToken(localStorage.getItem("token"))
            console.log("Hello");
        }
    }, [])


    return <AuthContext.Provider value={{ userToken, setUserToken }}>
        {children}
    </AuthContext.Provider>
}

