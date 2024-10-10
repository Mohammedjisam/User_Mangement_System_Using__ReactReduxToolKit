import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";

 function ProtectHome({children}){
    
    const user = useSelector((state) => state.user.users)
    if(!user){
        return <Navigate to={"/login"}/>
    }
    return children
}

export default ProtectHome;