import { Layout, Menu } from "antd";
import { selectCurrentUser } from "../../redux/features/auth/authSlice";
import { useAppSelector } from "../../redux/hooks";
import { adminPaths } from "../../routes/admin.routes";
import { facultyPaths } from "../../routes/faculty.routes";
import { studentPaths } from "../../routes/student.routes";
import { sideBarItemsGenerator } from "../../utils/sidebarItemsGenerator";

const { Sider } = Layout;

const USER_ROLE = {
  admin: "admin",
  faculty: "faculty",
  student: "student",
};

const Sidebar = () => {
  const user = useAppSelector(selectCurrentUser);

  let sidebarItems;
  switch (user!.role) {
    case USER_ROLE.admin:
      sidebarItems = sideBarItemsGenerator(adminPaths, USER_ROLE.admin);
      break;
    case USER_ROLE.faculty:
      sidebarItems = sideBarItemsGenerator(facultyPaths, USER_ROLE.faculty);
      break;
    case USER_ROLE.student:
      sidebarItems = sideBarItemsGenerator(studentPaths, USER_ROLE.student);
      break;
    default:
      break;
  }
  return (
    <Sider
      breakpoint="lg"
      collapsedWidth="0"
      style={{ height: "100vh", position: "sticky", top: "0", left: "0" }}
    >
      <div
        style={{
          color: "white",
          height: "4rem",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <h1>PH Uni</h1>
      </div>
      <Menu
        theme="dark"
        mode="inline"
        defaultSelectedKeys={["4"]}
        items={sidebarItems}
      />
    </Sider>
  );
};

export default Sidebar;
