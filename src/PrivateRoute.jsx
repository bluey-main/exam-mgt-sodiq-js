
import { Navigate, Outlet } from 'react-router-dom';


const PrivateRoute = () => {
    // const user = useAuth();
    if (localStorage.getItem("accessToken") == null) {
        return <Navigate to={'/login'}/>
    }
  return <Outlet/>
  
}

export default PrivateRoute