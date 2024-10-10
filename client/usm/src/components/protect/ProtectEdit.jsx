import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";

 function ProtectEdit({children}){
    
    const user = useSelector((state) => state.user.users)
    if(user){
        return <Navigate to={"/home"}/>
    }
    return children
}

export default ProtectEdit;