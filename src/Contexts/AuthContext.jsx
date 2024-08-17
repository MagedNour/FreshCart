import { createContext } from "react";


export const AuthContext = createContext();


export default function AuthContextProvider ({children}){

    const [userToken, setUserToken] = useState("");

    return <AuthContext.Provider value={{userToken, setUserToken}}>
        {children}
    </AuthContext.Provider>
} 

