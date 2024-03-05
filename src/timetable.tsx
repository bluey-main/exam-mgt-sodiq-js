import React, { useEffect, useState } from "react";
import axios from "axios";
import "./App.css";
import { Button } from "@material-tailwind/react";
import { useNavigate } from "react-router-dom";

const Timetable = () => {
  const [preciseComputerTechCourses, setPreciseComputerTechCourses] = useState(
    {}
  );
  const [preciseFoodTechCourses, setPreciseFoodTechCourses] = useState({});
  const [preciseNutCourses, setPreciseNutCourses] = useState({});
  const [preciseHospCourses, setPreciseHospCourses] = useState({});
  const [preciseTextileCourses, setPreciseTextileCourses] = useState({});
  const [precisePolymerCourses, setPrecisePolymerCourses] = useState({});
  const cbtIndex = 3;
  const navigate = useNavigate();

  const handlePrint = () => {
    navigate("/timetable");

    setTimeout(() => {
      window.print();
    }, 1000);

  };

  useEffect(() => {
    const getTimetable = async () => {
      try {
        const response = await axios.get(
          "https://exam-management-six.vercel.app/timetable"
        );
        const timetable = response.data.timetable;

        const findPreciseCourse = (day, department, studentClass) => {
          const filteredTimetable = timetable.filter(
            (item) =>
              item.name === day &&
              item.department === department &&
              item.class === studentClass
          );
          return filteredTimetable.length > 0
            ? filteredTimetable[filteredTimetable.length - 1].course
            : "";
        };

        // Example: Generate the days dynamically based on the response
        const days = [
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

        // Example: Generate the classes dynamically based on the response
        const computerTechClasses = ["ND1", "ND2", "HND1", "HND2"];
        const foodTechClasses = ["ND1", "ND2", "HND1", "HND2"];
        const nutTechClasses = ["ND1", "ND2", "HND1", "HND2"];
        const hospClasses = ["ND1", "ND2", "HND1", "HND2"];
        const textileClasses = ["ND1", "ND2", "HND1", "HND2"];
        const polymerClasses = ["ND1", "ND2"];

        const generatedComputerTechCourses = {};
        const generatedFoodTechCourses = {};
        const generatedNutCourses = {};
        const generatedHospCourses = {};
        const generatedTextileCourses = {};
        const generatedPolymerCourses = {};

        computerTechClasses.forEach((studentClass) => {
          days.forEach((day) => {
            generatedComputerTechCourses[`${day}_${studentClass}`] =
              findPreciseCourse(day, "Computer Technology", studentClass);
          });
        });

        foodTechClasses.forEach((studentClass) => {
          days.forEach((day) => {
            generatedFoodTechCourses[`${day}_${studentClass}`] =
              findPreciseCourse(day, "Food Technology", studentClass);
          });
        });

        nutTechClasses.forEach((studentClass) => {
          days.forEach((day) => {
            generatedNutCourses[`${day}_${studentClass}`] = findPreciseCourse(
              day,
              "Nutrition",
              studentClass
            );
          });
        });

        hospClasses.forEach((studentClass) => {
          days.forEach((day) => {
            generatedHospCourses[`${day}_${studentClass}`] = findPreciseCourse(
              day,
              "Hospitality Mgt",
              studentClass
            );
          });
        });

        textileClasses.forEach((studentClass) => {
          days.forEach((day) => {
            generatedTextileCourses[`${day}_${studentClass}`] =
              findPreciseCourse(day, "Textile Technology", studentClass);
          });
        });

        polymerClasses.forEach((studentClass) => {
          days.forEach((day) => {
            generatedPolymerCourses[`${day}_${studentClass}`] =
              findPreciseCourse(day, "Polymer Technology", studentClass);
          });
        });

        setPreciseComputerTechCourses(generatedComputerTechCourses);
        setPreciseFoodTechCourses(generatedFoodTechCourses);
        setPreciseNutCourses(generatedNutCourses);
        setPreciseHospCourses(generatedHospCourses);
        setPreciseTextileCourses(generatedTextileCourses);
        setPrecisePolymerCourses(generatedPolymerCourses);

        // console.log(generatedComputerTechCourses);
        // console.log(preciseFoodTechCourses);
        // console.log(preciseNutCourses);
        // console.log(preciseHospCourses);
        // console.log(preciseTextileCourses);
        // console.log(precisePolymerCourses);

        // console.log(timetable);
      } catch (error) {
        console.log(error);
      }
    };

    getTimetable();
  }, []);

  return (
    <div className="w-full h-screen px-7 my-16 ">
      <div className="w-full flex justify-center items-center py-10">
        <Button
          onClick={() => {
            handlePrint();
          }}
          className="text-lg"
          placeholder={"print"}
        >
          Print Timetable
        </Button>
      </div>

      <table className="border border-black w-full">
        <tbody>
          <tr className="text-center">
            <td colSpan={12}>
              <h1 className="text-2xl font-bold">YABA COLLEGE OF TECHNOLOGY</h1>
              <h1 className="text-2xl font-bold">SCHOOL OF TECHNOLOGY</h1>
            </td>
          </tr>
          <tr className="text-center">
            <td colSpan={12}>
              <h1 className="text-xl font-bold">EXAMINATION TIMETABLE</h1>
            </td>
          </tr>
          <tr>
            <td rowSpan={6}> Day</td>
            <td rowSpan={6}> Classes</td>
          </tr>
          <tr className="font-bold">
            <td>Day1</td>
            <td>Day2</td>
            <td>Day3</td>
            <td>Day4</td>
            <td>Day5</td>
            <td>Day6</td>
            <td>Day7</td>
            <td>Day8</td>
            <td>Day9</td>
            <td>Day10</td>
          </tr>
          <tr className="font-semibold">
            <td>Monday</td>
            <td>Tuesday</td>
            <td>Wednesday</td>
            <td>Thursday</td>
            <td>Friday</td>
            <td>Monday</td>
            <td>Tuesday</td>
            <td>Wednesday</td>
            <td>Thursday</td>
            <td>Friday</td>
          </tr>
          <tr className="font-semibold">
            <td>25-02-2024</td>
            <td>25-02-2024</td>
            <td>25-02-2024</td>
            <td>25-02-2024</td>
            <td>25-02-2024</td>
            <td>25-02-2024</td>
            <td>25-02-2024</td>
            <td>25-02-2024</td>
            <td>25-02-2024</td>
            <td>25-02-2024</td>
          </tr>
          <tr className="font-semibold">
            <td>M</td>
            <td>A</td>
            <td>M</td>
            <td></td>
            <td>M</td>
            <td>E</td>
            <td>M</td>
            <td>A</td>
            <td>M</td>
            <td>A</td>
          </tr>
          <tr className="font-semibold">
            <td>9am-12pm</td>
            <td>1pm-4pm</td>
            <td>9am-12pm</td>
            <td className="bg-black text-white">9am (CBT PAPERS)</td>
            <td>9am-12pm</td>
            <td>3pm-6pm</td>
            <td>9am-12pm</td>
            <td>1pm-3pm</td>
            <td>9am-12pm</td>
            <td>1pm-3pm</td>
          </tr>

          {/* Example: Dynamc generation of rows */}
          <tr>
            <td rowSpan={5}>Computer Technology</td>
          </tr>
          {["HND1", "HND2", "ND2", "ND1"].map((studentClass) => (
            <tr key={studentClass}>
              <td>{studentClass}</td>
              {[
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
              ].map((day, index) => (
                <td
                  key={day}
                  className={`${
                    index == cbtIndex ? "bg-black text-white" : ""
                  }`}
                >
                  {preciseComputerTechCourses[`${day}_${studentClass}`]}
                </td>
              ))}
            </tr>
          ))}

          <tr>
            <td rowSpan={5}>Food Technology</td>
          </tr>
          {["HND1", "HND2", "ND2", "ND1"].map((studentClass) => (
            <tr key={studentClass}>
              <td>{studentClass}</td>
              {[
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
              ].map((day, index) => (
                <td
                  key={day}
                  className={`${
                    index == cbtIndex ? "bg-black text-white" : ""
                  }`}
                >
                  {preciseFoodTechCourses[`${day}_${studentClass}`]}
                </td>
              ))}
            </tr>
          ))}

          <tr>
            <td rowSpan={5}>Nutrition And Dietics</td>
          </tr>
          {["HND1", "HND2", "ND2", "ND1"].map((studentClass) => (
            <tr key={studentClass}>
              <td>{studentClass}</td>
              {[
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
              ].map((day, index) => (
                <td
                  key={day}
                  className={`${
                    index == cbtIndex ? "bg-black text-white" : ""
                  }`}
                >
                  {preciseNutCourses[`${day}_${studentClass}`]}
                </td>
              ))}
            </tr>
          ))}

          <tr>
            <td rowSpan={5}>Hospitality Management</td>
          </tr>
          {["HND1", "HND2", "ND2", "ND1"].map((studentClass) => (
            <tr key={studentClass}>
              <td>{studentClass}</td>
              {[
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
              ].map((day, index) => (
                <td
                  key={day}
                  className={`${
                    index == cbtIndex ? "bg-black text-white" : ""
                  }`}
                >
                  {preciseHospCourses[`${day}_${studentClass}`]}
                </td>
              ))}
            </tr>
          ))}

          <tr>
            <td rowSpan={5}>Textile Technology</td>
          </tr>
          {["HND1", "HND2", "ND2", "ND1"].map((studentClass) => (
            <tr key={studentClass}>
              <td>{studentClass}</td>
              {[
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
              ].map((day, index) => (
                <td
                  key={day}
                  className={`${
                    index == cbtIndex ? "bg-black text-white" : ""
                  }`}
                >
                  {preciseTextileCourses[`${day}_${studentClass}`]}
                </td>
              ))}
            </tr>
          ))}

          <tr>
            <td rowSpan={5}>Polymer Technology</td>
          </tr>
          {["ND2", "ND1"].map((studentClass) => (
            <tr key={studentClass}>
              <td>{studentClass}</td>
              {[
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
              ].map((day, index) => (
                <td
                  key={day}
                  className={`${
                    index == cbtIndex ? "bg-black text-white" : ""
                  }`}
                >
                  {precisePolymerCourses[`${day}_${studentClass}`]}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Timetable;
