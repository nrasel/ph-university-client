import type { TableColumnsType, TableProps } from "antd";
import { Button, Table } from "antd";
import { useState } from "react";
import { useGetAcademicDepartmentsQuery } from "../../../redux/features/admin/academicManagement.api";
import { TQueryParam } from "../../../types";
import { TAcademicSemester } from "../../../types/academicManagement.type";

export type TTableData = Pick<TAcademicSemester, "name">;

const AcademicDepartment = () => {
  const [params] = useState<TQueryParam[] | undefined>([]);
  const { data: departmentData, isFetching } =
    useGetAcademicDepartmentsQuery(params);

  const columns: TableColumnsType<TTableData> = [
    {
      title: "Academic Faculty",
      dataIndex: "academicFaculty",
      showSorterTooltip: { target: "full-header" },
    },
    {
      title: "Department Name",
      dataIndex: "name",
      showSorterTooltip: { target: "full-header" },
    },

    {
      title: "Action",
      key: "X",
      render: () => {
        return (
          <div>
            <Button>Update</Button>
          </div>
        );
      },
    },
  ];

  const onChange: TableProps<TTableData>["onChange"] = (
    pagination,
    filters,
    sorter,
    extra
  ) => {
    console.log("params", pagination, filters, sorter, extra);
  };

  const tableData = departmentData?.data?.map((item: any) => ({
    academicFaculty: item?.academicFaculty?.name,
    name: item?.name,
    key: item._id,
  }));

  return (
    <Table<TTableData>
      loading={isFetching}
      columns={columns}
      dataSource={tableData}
      onChange={onChange}
      showSorterTooltip={{ target: "sorter-icon" }}
    />
  );
};

export default AcademicDepartment;
