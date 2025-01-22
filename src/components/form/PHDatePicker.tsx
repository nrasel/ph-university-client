import { DatePicker, Form } from "antd";
import { Controller } from "react-hook-form";

type TIDatePickerProps = {
  type: string;
  name: string;
  label?: string;
};

const PHDatePicker = ({ name, label }: TIDatePickerProps) => {
  return (
    <div>
      <Controller
        name={name}
        render={({ field }) => (
          <Form.Item label={label}>
            <DatePicker {...field} size="large" style={{ width: "100%" }} />
          </Form.Item>
        )}
      />
    </div>
  );
};

export default PHDatePicker;
