import {
  DateField,
  TagField,
  List,
  Table,
  TextField,
  useTable,
  Select,
  useSelect,
  FilterDropdown,
  ShowButton,
  EditButton,
  Space,
  DeleteButton,
} from "@pankod/refine-antd";
import { HttpError, useMany } from "@pankod/refine-core";

import { ICategory, IPost } from "interfaces";

export const PostList: React.FC = () => {
  const { tableProps } = useTable<IPost, HttpError>();

  const categoryIds =
    tableProps?.dataSource?.map((item) => item.category.id) ?? [];

  const { isLoading, data: categoriesData } = useMany<ICategory>({
    resource: "categories",
    ids: categoryIds,
    queryOptions: {
      enabled: categoryIds?.length > 0,
    },
  });

  const { selectProps: categorySelectProps } = useSelect<ICategory>({
    resource: "categories",
  });
  return (
    <List>
      <Table {...tableProps} rowKey={"id"}>
        <Table.Column dataIndex={"title"} title="Title" />
        <Table.Column
          dataIndex={"status"}
          title="Status"
          render={(value) => <TagField value={value} />}
        />
        <Table.Column
          dataIndex={"createdAt"}
          title="Created At"
          render={(value) => <DateField format="LLL" value={value} />}
        />
        <Table.Column
          dataIndex={["category", "id"]}
          title="category"
          render={(value) => {
            if (isLoading) {
              return <TextField value="Loading..." />;
            }

            return (
              <TextField
                value={
                  categoriesData?.data?.find((item) => item.id === value)?.title
                }
              />
            );
          }}
          filterDropdown={(props) => {
            return (
              <FilterDropdown {...props}>
                <Select
                  style={{ minWidth: 200 }}
                  mode="multiple"
                  placeholder="Select Category"
                  {...categorySelectProps}
                />
              </FilterDropdown>
            );
          }}
        />

        <Table.Column<IPost>
          title=" Actions"
          dataIndex={"actions"}
          render={(_text, record) => {
            return (
              <Space>
                <ShowButton
                  size="small"
                  recordItemId={record.id}
                  hideText={true}
                />
                <EditButton
                  size="small"
                  recordItemId={record.id}
                  hideText={true}
                />
                <DeleteButton
                  size="small"
                  recordItemId={record.id}
                  hideText={true}
                />
              </Space>
            );
          }}
        />
      </Table>
    </List>
  );
};
