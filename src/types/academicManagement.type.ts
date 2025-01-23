export type TAcademicSemester = {
  _id: string;
  name: string;
  year: string;
  code: string;
  startMonth: string;
  endMonth: string;
};
export type TAcademicDepartment = {
  _id: string;
  name: string;
  academicFaculty: string;
};
export type TAcademicFaculty = {
  _id: string;
  name: string;
};
