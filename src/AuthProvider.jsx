import axios from "axios";
import PropTypes from "prop-types"; // Import PropTypes for prop validation
import { createContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(localStorage.getItem("user") || "");
  const navigate = useNavigate();

  const login = async (email, password) => {

    try {
      const response = await axios.post(
        "https://exam-management-six.vercel.app/login",
        {
          username: email,
          password: password,
        }, 
        {
          withCredentials:true
        }
      );
      
  
      if (response.data) {
        setUser(response.data.username);
        localStorage.setItem("user", email);
        localStorage.setItem('accessToken', response.data.access_token);

        navigate("/dashboard");
      }

      console.log( response.data);
      toast.success("Signed In Successfully");


    } catch (error) {
      console.log(error);
      toast.error('Failed To Sign In');

    }
  };

  const register = async (email, password, role) => {
    try {
      const response = await axios.post(
        "https://exam-management-six.vercel.app/register",
        {
          username: email,
          password: password,
          role: role,
        }, 
        {
          withCredentials:true
        }
      );
      
  
      if (response.data) {
        setUser(response.data.username);
        localStorage.setItem("user", email);
        localStorage.setItem('accessToken', response.data.access_token);

        navigate("/dashboard");
      }

      console.log(response.config, response.status);
      toast.success("Registered Successfully");


    } catch (error) {
      console.log(error);
      toast.error('Failed To Register');
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("user");
    localStorage.removeItem("accessToken");

    navigate("/login");
    toast.success("Signed Out Successfully");
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, register }}>
      {children}
    </AuthContext.Provider>
  );
};

// Add prop validation for AuthProvider component
AuthProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default AuthContext;
