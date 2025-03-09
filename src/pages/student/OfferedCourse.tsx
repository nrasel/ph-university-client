import { Button, Col, Row } from "antd";
import {
  useEnrolledCourseMutation,
  useGetAllOfferedCoursesQuery,
} from "../../redux/features/student/studentCourseManagement.api";

const OfferedCourse = () => {
  const { data: offeredCourseData } = useGetAllOfferedCoursesQuery(undefined);
  const [enroll] = useEnrolledCourseMutation();

  const singleObject = offeredCourseData?.data?.reduce((acc: any, item) => {
    const key = item.course.title;
    acc[key] = acc[key] || { courseTitle: key, sections: [] };
    acc[key].sections.push({
      section: item.section,
      _id: item._id,
      days: item.days,
      startTime: item.startTime,
      endTime: item.endTime,
    });
    return acc;
  }, {});

  const modifiedData = Object.values(singleObject ? singleObject : {});
  console.log(modifiedData);
  if (!modifiedData.length) {
    return <p>No available courses</p>;
  }

  const handleEnroll = async (id: any) => {
    const enrollData = {
      offeredCourse: id,
    };

    const res = await enroll(enrollData);
    //  console.log(res);
  };

  return (
    <Row gutter={[0, 20]}>
      {modifiedData?.map((item: any, index) => {
        return (
          <Col key={index} span={24} style={{ border: "solid #d4d4d4 2px" }}>
            <div style={{ padding: "10px" }}>
              <h2>{item.courseTitle}</h2>
            </div>
            <div>
              {item?.sections?.map((section: any, index: string) => {
                return (
                  <Row
                    key={index}
                    justify="space-between"
                    align="middle"
                    style={{
                      borderTop: "solid #d4d4d4 2px",
                      padding: "10px",
                    }}
                  >
                    <Col span={5}>Section: {section.section} </Col>
                    <Col span={5}>
                      days:
                      {section?.days?.map((day: string, index: string) => (
                        <span key={index}> {day} </span>
                      ))}
                    </Col>
                    <Col span={5}>Start Time: {section.startTime} </Col>
                    <Col span={5}>End Time: {section.endTime} </Col>
                    <Button onClick={() => handleEnroll(section._id)}>
                      Enroll
                    </Button>
                  </Row>
                );
              })}
            </div>
          </Col>
        );
      })}
    </Row>
  );
};

export default OfferedCourse;
