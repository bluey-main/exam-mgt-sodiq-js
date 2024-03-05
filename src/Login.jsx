import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Typography,
  Button,
  Input,
} from "@material-tailwind/react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import useAuth from "./hooks/useAuth";

export default function Login() {
    const navigate = useNavigate();
    const auth = useAuth();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    
    const login = (email, password) => {
        if (email !== "" && password !== "") {
            auth.login(email, password)
        }
    }


  return (
    <div className="w-full h-screen bg-gray-300  flex justify-center items-center">
      <Card className="w-96">
        <CardHeader>
          <div className="flex justify-between items-center h-16 px-8">
            <Typography className="font-bold" variant="h4" color="black">
              Login
            </Typography>
            <Button color="white" size="small"  className="bg-yellow-500 text-black" outline onClick={()=> navigate('/signup')}>
              Sign Up
            </Button>
       
          </div>
        </CardHeader>
        <CardBody>
          <div className="py-6">
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

          <div>
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
        </CardBody>
        <CardFooter>
          <div className="flex justify-between items-center">
            <Button color="white" size="small"  className="bg-green-500 text-white" outline 
            onClick={() => login(email, password)}
            >
              Sign In
            </Button>
            {/* <Button color="white" size="small"  outline>
              Forgot Password?
            </Button> */}
          </div>
        </CardFooter>
      </Card>
    </div>
  );
}
