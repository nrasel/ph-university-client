import type { TableColumnsType, TableProps } from "antd";
import { Button, Table } from "antd";
import { useState } from "react";
import { useGetAllAcademicFacultyQuery } from "../../../redux/features/admin/academicManagement.api";
import { TQueryParam } from "../../../types";
import { TAcademicFaculty } from "../../../types/academicManagement.type";

export type TTableData = Pick<TAcademicFaculty, "name">;

const AcademicSemester = () => {
  const [params, setParams] = useState<TQueryParam[] | undefined>([]);
  const { data: academicFacultyData, isFetching } =
    useGetAllAcademicFacultyQuery(params);

  const columns: TableColumnsType<TTableData> = [
    {
      title: "Name",
      dataIndex: "name",
      fixed: "left",
      key: "name",
      // showSorterTooltip: { target: "full-header" },
    },
    {
      title: "Action",
      fixed: "right",
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
    if (extra.action === "filter") {
      const queryParams: TQueryParam[] = [];

      filters.name?.forEach((item) =>
        queryParams.push({ name: "name", value: item })
      );
      setParams(queryParams);
    }
  };

  const tableData = academicFacultyData?.data?.map(
    ({ _id, name }: { _id: string; name: string }) => ({
      key: _id,
      name,
    })
  );

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

export default AcademicSemester;
