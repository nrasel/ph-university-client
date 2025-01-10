import { Layout, Menu } from "antd";
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
  const role = "faculty";
  let sidebarItems;
  switch (role) {
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
      onBreakpoint={(broken) => {
        console.log(broken);
      }}
      onCollapse={(collapsed, type) => {
        console.log(collapsed, type);
      }}
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
        PH Uni
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
