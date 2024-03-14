import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Typography,
  Button,
  Input,
  Select,
  Option,
} from "@material-tailwind/react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import useAuth from "./hooks/useAuth";
import { toast } from "react-toastify";
export default function Register() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [role, setRole] = useState('');
  const auth = useAuth();

  
  const signup = () =>{
    if (email !== "" && password !== "" && confirmPassword == password && password.length >= 8) {
      auth.register(email, password, role)
  }

  if (confirmPassword != password) {
    toast.error("Passwords Don't Match")
  }

  if(password.length < 8){
    toast.error("Password must be at least 8 characters long")
  }}

  const navigate = useNavigate();
  return (
    <div className="w-full h-screen bg-gray-300 flex justify-center items-center">
      <Card className="w-96">
        <CardHeader>
          <div className="flex justify-between items-center h-16 px-8">
            <Typography className="font-bold" variant="h4" color="black">
              Register
            </Typography>
          </div>
        </CardHeader>
        <CardBody>
          <div className="py-3">
            <Input
              label="Email"
              placeholder="Enter your email"
              type="email"
              color="black"
              onChange={(e) => {
                setEmail(e.target.value);
              }}
            />
          </div>

          <div className="py-3">
            <Input
              label="Password"
              placeholder="Enter your password"
              type="password"
              color="black"
              onChange={(e) => {
                setPassword(e.target.value);
              }}
            />
          </div>
          <div className="py-3">
            <Input
              label="Confirm Password"
              placeholder="Confirm your password"
              type="password"
              color="black"
              onChange={(e) => {
                setConfirmPassword(e.target.value);
              }}
            />
          </div>
          <div className="py-3">
            <Select label="Select Version">
              <Option value="staff" onClick={() => setRole('staff')}>Exam Officer</Option>
              <Option value="staff" onClick={() => setRole('student')}>Invigilator</Option>
              <Option value="student"  onClick={() => setRole('student')}>Student</Option>
            </Select>
          </div>
        </CardBody>
        <CardFooter>
          <div className="flex justify-between items-center">
            <Button
              color="white"
              size="small"
              className="bg-green-500 text-white"
              outline
              onClick={signup}
            >
              Sign Up
            </Button>
            <Button color="white" size="small" outline onClick={() => {
              navigate("/login");
            }}>
              Login
            </Button>
          </div>
        </CardFooter>
      </Card>
    </div>
  );
}
