import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from "./Login";
import Register from "./Register";
import Example from "./Example";
import { AuthProvider } from "./AuthProvider";
import Dashboard from "./Dashboard";
import PrivateRoute from "./PrivateRoute";
import Timetable from "./timetable";

function App() {
  return (
    <>
     
      <BrowserRouter>
        <AuthProvider>
        <ToastContainer 
         position="top-right"
         autoClose={5000}
         hideProgressBar={false}
         newestOnTop={false}
         closeOnClick
         rtl={false}
         pauseOnFocusLoss
         draggable
         pauseOnHover
         theme="light"/>
          <Routes>
            <Route path="/" element={<Example />} />
            {/* <Route path="/dashboard" element={<Dashboard />} /> */}
            <Route path="/timetable" element={<Timetable />} />
            <Route element={<PrivateRoute />}>
              <Route path="/dashboard" element={<Dashboard />} />
            </Route>
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Register />} />
          </Routes>
        </AuthProvider>
      </BrowserRouter>

     
    </>
  );
}

export default App;
