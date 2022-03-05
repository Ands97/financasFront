import { useContext } from "react";
import { AuthContext } from "../../contexts/AuthContext";
import Login from "../../pages/Login";

export const RequireAuth = ({children}) => {
    const auth = useContext(AuthContext);

    if(!auth.token){
        return <Login/>
    }

    return children
}