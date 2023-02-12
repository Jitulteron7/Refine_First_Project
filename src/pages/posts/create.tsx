import {
  Create,
  Form,
  Input,
  Select,
  useForm,
  useSelect,
} from "@pankod/refine-antd";
import { IPost } from "interfaces";

export const PostCreate: React.FC = () => {
  const { formProps, saveButtonProps } = useForm<IPost>();
  const { selectProps: categorySelectProps } = useSelect({
    resource: "categories",
  });
  return (
    <Create saveButtonProps={saveButtonProps}>
      <Form {...formProps} layout="vertical">
        <Form.Item
          label="Title"
          name={"title"}
          rules={[
            {
              required: true,
            },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="Status"
          name={"status"}
          rules={[
            {
              required: true,
            },
          ]}
        >
          <Select
            options={[
              {
                label: "Published",
                value: "published",
              },
              {
                label: "Draft",
                value: "draft",
              },
              {
                label: "Rejected",
                value: "rejected",
              },
            ]}
          />
        </Form.Item>
        <Form.Item>
          <Select {...categorySelectProps} />
        </Form.Item>
      </Form>
    </Create>
  );
};
