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

const MainFood = () => {
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
    "FST311",
    "FST312",
    "FST313",
    "FST314",
    "FST315",
    "FST316",
    "FST321",
    "FST322",
    "FST323",
    "FST324",
    "FST325",
    "FST326",
  ];

  const courseListHnd2 = [
    "Select Course",
    "FST411",
    "FST412",
    "FST413",
    "FST414",
    "FST415",
    "FST416",
    "FST421",
    "FST422",
    "FST423",
    "FST424",
    "FST425",
    "FST426",
  ];

  const courseListNd1 = [
    "Select Course",
    "FST111",
    "FST112",
    "FST113",
    "FST114",
    "FST115",
    "FST116",
    "FST117",
    "FST118",
    "FST121",
    "FST122",
    "FST123",
    "FST124",
    "FST125",
    "FST126",
    "FST127",
    "FST128",
  ];

  const courseListNd2 = [
    "Select Course",
    "FST211",
    "FST212",
    "FST213",
    "FST214",
    "FST215",
    "FST216",
    "FST217",
    "FST218",
    "FST221",
    "FST222",
    "FST223",
    "FST224",
    "FST225",
    "FST226",
    "FST227",
    "FST228",
  ];
  // const [name, setName] = useState("");
  const [course, setCourse] = useState("");
  // const [date, setDate] = useState("");
  // const [time, setTime] = useState("");
  // const [period, setPeriod] = useState("");
  const [active, setActive] = useState(false);
  const [deptClass, setDeptClass] = useState("Nd1");
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
        department: "Food Technology",
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

                    {/* <div>
                      <input
                        id="date"
                        type="date"
                        placeholder="date"
                        className="border-blue-gray-100 border w-full p-2 rounded-lg"
                        onChange={(e) => {
                          formatSelectedDate(e.target.value);
                          setDate((prevDate) => {
                            console.log(prevDate);
                            return prevDate;
                          });
                        }}
                      />
                      <p>Selected Date: {date}</p>
                    </div>
                    <hr />

                    <div className="w-full flex flex-wrap">
                      <div className="flex gap-x-2 ">
                        {["morning", "afternoon", "evening"].map((value, index) => (
                          
                            <div className={`flex-1 text-center flex justify-center items-center w-11 h-7 ${(activePeriodIndex == index)? "bg-green-500": "bg-red-500"} m-3 text-white cursor-pointer`} key={index} onClick={
                              () => {
                                      let selectedTime = "";
                                      setActivePeriodIndex(index)
                                      if (value === "morning") {
                                        selectedTime = "9am - 12pm";
                                      } else if (value === "afternoon") {
                                        selectedTime = "1pm - 3pm";
                                      } else {
                                        selectedTime = "4pm - 6pm";
                                      }
                                      setTime(selectedTime);
                                      setTime((prevTime) => {
                                        console.log(prevTime);
                                        return prevTime;
                                      });
                                      setPeriod(value);
                                      setPeriod((prevPeriod) => {
                                        console.log(prevPeriod);
                                        return prevPeriod;
                                      });
                                    }
                            }>
                              {value.charAt(0).toUpperCase()}
                            </div>

                          
                        ))}
                      </div>
                      <p>Selected option: {time}</p>
                    </div> */}
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

export default MainFood;
