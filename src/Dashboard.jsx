import { Button, Typography } from "@material-tailwind/react";
import useAuth from "./hooks/useAuth";
import {  useState } from "react";
import { RiComputerLine } from "react-icons/ri";
import { PiBowlFood } from "react-icons/pi";
import { IoNutritionOutline } from "react-icons/io5";
import { IoRestaurantOutline } from "react-icons/io5";
import { GiRolledCloth } from "react-icons/gi";
import { GiChemicalDrop } from "react-icons/gi";
import MainCompt from "./computer/mainComp";
import MainFood from "./foodTech/mainFood";
import MainNut from "./nut/mainNut";
import MainHosp from "./hospitality/mainHosp";
import MainTextile from "./texttile/mainTextile";
import MainPolymer from "./polymer/mainPolymer";
import Timetable from "./timetable";
import { useNavigate } from "react-router-dom";

export default function Dashboard() {
  const auth = useAuth();
  const navigate = useNavigate();

  const logout = () => {
    auth.logout();
  };

  const [visibleComponent, setVisibleComponent] = useState(<MainCompt />);
  const [componentName, setComponentName] = useState("Computer Technology");
  const [clickedIndex, setClickedIndex] = useState(0);
  // const getTimetable = async () => {
  //   try {
  //     const response = await axios.get(
  //       "https://exam-management-six.vercel.app/timetable"
  //     );
      

  //     console.log(response);
  //     console.log(response.data.timetable);
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };

  // useEffect(() => {
  //   getTimetable();
  // }, []);

  const depts = [
    {
      id: 1,
      deptName: "Computer Technology",
      deptIcon: <RiComputerLine className="text-4xl" />,
      component: <MainCompt />,
    },
    {
      id: 2,
      deptName: "Food Technology",
      deptIcon: <PiBowlFood className="text-4xl" />,
      component: <MainFood />,
    },
    {
      id: 3,
      deptName: "Nutrition And Dietics",
      deptIcon: <IoNutritionOutline className="text-4xl" />,
      component: <MainNut />,
    },
    {
      id: 4,
      deptName: "Hospitality Management",
      deptIcon: <IoRestaurantOutline className="text-4xl" />,
      component: <MainHosp />,
    },
    {
      id: 5,
      deptName: "Textile Technology",
      deptIcon: <GiRolledCloth className="text-4xl" />,
      component: <MainTextile />,
    },
    {
      id: 6,
      deptName: "Polymer Technology",
      deptIcon: <GiChemicalDrop className="text-4xl" />,
      component: <MainPolymer />,
    },
  ];

  const changeComponent = (value) => {
    setVisibleComponent(value.component);
    setComponentName(value.deptName);
  };
  return (
    <div className="flex w-full h-screen bg-blue-gray-3">
      <div className="w-[20%] h-full bg-orange-5">
        <div className="w-full h-[10%] bg-red-3 justify-center items-center flex">
          <h1 className="text-3xl font-bold ">
            Exam<span className="text-orange-5">Mgt</span>{" "}
          </h1>
        </div>
        {(localStorage.getItem('role') != 'student') ?
        <div className="w-full h-[60%] bg-brown-5">
          {depts.map((dept, index) => {
            return (
              <div
                className={`w-full h-[2.5rem] ${
                  clickedIndex == index
                    ? "bg-blue-gray-50 outline outline-blue-gray-50 font-bold text-green-600 outline-1 ml-5"
                    : "bg-transparent"
                } flex my-5 cursor-pointer`}
                key={dept.id}
                onClick={() => {
                  setClickedIndex(index);
                  changeComponent(dept);
                }}
                style={{
                  transition: "ease-in-out",
                  transitionDuration: "0.2s",
                }}
              >
                <div className="w-[20%] h-full bg-lime-4 flex justify-center items-center">
                  {dept.deptIcon}
                </div>
                <div className="w-[80%] h-full bg-lime-6 flex items-center">
                  <p>{dept.deptName}</p>
                </div>
              </div>
            );
          })}
        </div>
        : ""
}
        <div className="w-full h-[30%] bg-green-4 flex flex-col gap-y-9 justify-center items-center">
          <Button onClick={() => {
            setVisibleComponent(<Timetable />) 
            setComponentName("Timetable")
        
        }}>
            <Typography>TIMETABLE</Typography>
          </Button>

          <Button className="bg-red-600" onClick={() => {
            logout()
        
        }}>
            <Typography className="text-xs">Log Out</Typography>
          </Button>
        </div>
      </div>
      <div className="w-[80%] h-full bg-blue-gray-50">
        <div className="w-full h-[10%] bg-pink-4 flex px-10">
          <div className="w-1/2 h-full bg-purple- flex items-center justify-between">
          {(localStorage.getItem('role') != 'student') ?
            <h1 className="text-3xl font-bold text-green-600">{componentName}</h1> : ""}
            {(componentName == "Timetable") ? <Button onClick={() => navigate('/timetable')}>View Full</Button> : ""}
          </div>
          <div className="w-1/2 h-full bg-purple flex justify-end">
            <div className="w-[10rem] h-full bg-pink- flex justify-center items-center gap-x-2 pr-10">
              {/* <Avatar
                src="https://docs.material-tailwind.com/img/face-2.jpg"
                alt="avatar"
                onClick={() => logout()}
              /> */}

              <p className="text-2xl font-bold">Hello,</p>
              <p className="text-xl font-body">{localStorage.getItem("user")}</p>
            </div>
          </div>
        </div>
        {(localStorage.getItem('role') != 'student') ?
        <div className="w-full h-[90%] bg-orange- overflow-y-auto">

          {visibleComponent}
        </div>: <div className="w-full h-[90%] bg-orange- overflow-y-auto"><Timetable/></div> }
      </div>
    </div>
  );
}
