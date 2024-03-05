import {
  Card,

  CardBody,

  Typography,
  Button,
  Select,
  Option,

} from "@material-tailwind/react";
import axios from "axios";

import { useState } from "react";
import { toast } from "react-toastify";

const MainCompt = () => {
  const numberOfDays = [
    "day1",
    "day2",
    "day3",
    "day4",
    "day5",
    "day6",
    "day7",
    "day8",
    "day9",
    "day10",
  ];

  const courseListHnd1 = [
    "Select Course",
    "COM311",
    "COM312",
    "COM313",
    "COM314",
    "COM315",
    "COM316",
    "COM321",
    "COM322",
    "COM323",
    "COM324",
    "COM325",
    "COM326",
  ];

  const courseListHnd2 = [
    "Select Course",
    "COM411",
    "COM412",
    "COM413",
    "COM414",
    "COM415",
    "COM416",
    "COM421",
    "COM422",
    "COM423",
    "COM424",
    "COM425",
    "COM426",
  ];

  const courseListNd1 = [
    "Select Course",
    "COM111",
    "COM112",
    "COM113",
    "COM114",
    "COM115",
    "COM116",
    "COM117",
    "COM118",
    "COM121",
    "COM122",
    "COM123",
    "COM124",
    "COM125",
    "COM126",
    "COM127",
    "COM128",
  ];

  const courseListNd2 = [
    "Select Course",
    "COM211",
    "COM212",
    "COM213",
    "COM214",
    "COM215",
    "COM216",
    "COM217",
    "COM218",
    "COM221",
    "COM222",
    "COM223",
    "COM224",
    "COM225",
    "COM226",
    "COM227",
    "COM228",
  ];

  // const [name, setName] = useState("");
  const [course, setCourse] = useState("");
  // const [date, setDate] = useState("");
  // const [time, setTime] = useState("");
  // const [period, setPeriod] = useState("");
  const [active, setActive] = useState(false);
  const [deptClass, setDeptClass] = useState("ND1");
  const [deptClassCourses, setDeptClassCourses] = useState(courseListNd1);
  const [activeClassIndex, setActiveClassIndex] = useState(0);
  // const [activePeriodIndex, setActivePeriodIndex] = useState(0);
  const filterArray = [];
  
  const getTimetable = async() => {
    try {
      const response = await axios.get("https://exam-management-six.vercel.app/timetable")  

      response.data.timetable.forEach(
        (element) => {
          filterArray.push({            
            name: element.name,
            department: element.department

          });
        }
      )
      console.log(filterArray);
      console.log(response.data.timetable)
    } catch (error) {
      console.log(error)
    }
  }



  const setExam = async(day) => {
    try {
      const response = await axios.post("https://exam-management-six.vercel.app/set-exam",{
        data: {
          name: day,
          course: course,
          date: "date",
          time: "time",
          period: "period",
          active: active,
        },
        department: "Computer Technology",
        class: deptClass,
      }, 
      {
        headers:{
          Authorization: `Bearer ${localStorage.getItem('accessToken')}`

        }
        
      })

      console.log(response)
      toast.success(`${deptClass} ${day} Added`)
      getTimetable()
    } catch (error) {
      console.log(error)
      toast.error(`${deptClass} ${day} Not Added`)
    }
  }


  // const formatSelectedDate = (selectedDate) => {
  //   // Format the selected date as "DD/MM/YY"
  //   const [year, month, day] = selectedDate.split("-");
  //   setDate(`${day}/${month}/${year.slice(-2)}`);
  // };

  const classes = [
    {
      id: 1,
      name: "ND1",
      courses: courseListNd1,
    },
    {
      id: 2,
      name: "ND2",
      courses: courseListNd2,
    },
    {
      id: 3,
      name: "HND1",
      courses: courseListHnd1,
    },
    {
      id: 4,
      name: "HND2",
      courses: courseListHnd2,
    },
  ];

  return (
    <div className="w-full h-full">
      <div className="w-full h-[15%] bg-blue-gray- flex  items-center gap-x-5 px-7">
        {classes.map((clas,index) => {
          return (
            <Card
              key={clas.id}
              className={`w-[5rem] h-[3rem] ${(activeClassIndex == index) ? "bg-green-600" : "bg-white"}`}
              onClick={() => {
                setActiveClassIndex(index);
                setDeptClass(clas.name);
                setDeptClassCourses(clas.courses);
              }}
            >
              <CardBody className="w-full h-full flex justify-center items-center">
                <Typography
                  className="font-bold text-sm"
                  variant="h4"
                  color={`${(activeClassIndex == index) ? "white" : "black"}`}
                >
                  {clas.name}
                </Typography>
              </CardBody>
            </Card>
          );
        })}
      </div>

      <div className="w-full h-[85%] bg-brown- ">
       

        <div className="w-full h-[90%] bg-pink- flex px-8">
          <div className="w-full h-full flex gap-x-3 gap-y-4 flex-wrap overflow-y-auto justify-center pt-4">
            {numberOfDays.map((day, index) => {
              return (
                <Card className="w-[16rem]  " key={index}>
                  <CardBody className="flex flex-col gap-y-2">
                    <div className="flex justify-between items-center">
                      <Typography className="text-xl text-black">
                        Day {index + 1}
                      </Typography>
                      <Button
                        onClick={() => {
                          setActive(true);
                          setExam(day)
                          
                        }}
                      >
                        Set
                      </Button>
                    </div>
                    <hr />
                    <Select label="Select Course">
                      {deptClassCourses.map((selectedcourse) => (
                        <Option
                          key={selectedcourse}
                          onClick={() => {
                            setCourse(selectedcourse);
                            setCourse((prevCourse) => {
                              console.log(prevCourse);
                              return prevCourse;
                            });
                          }}
                        >
                          {selectedcourse}
                        </Option>
                      ))}
                    </Select>
                    <hr />

                    
                  </CardBody>
                </Card>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MainCompt;
