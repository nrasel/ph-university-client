import MyResult from "../pages/student/MyResult";
import MySchedule from "../pages/student/MySchedule";
import OfferedCourse from "../pages/student/OfferedCourse";
import StudentDashboard from "../pages/student/StudentDashboard";

export const studentPaths = [
  {
    name: "Dashboard",
    path: "dashboard",
    element: <StudentDashboard />,
  },
  {
    name: "Offered Course",
    path: "offered-course",
    element: <OfferedCourse />,
  },
  {
    name: "My Schedule",
    path: "my-schedule",
    element: <MySchedule />,
  },
  {
    name: "My Result",
    path: "my-result",
    element: <MyResult />,
  },
];
