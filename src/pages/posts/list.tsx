import { DateField, TagField, List, Table } from "@pankod/refine-antd";
import { useTable, HttpError, useMany } from "@pankod/refine-core";

import { ICategory, IPost } from "interfaces";

export const PostList: React.FC = () => {
  const { tableQueryResult } = useTable<IPost, HttpError>();

  const categoryIds = tableQueryResult.data?.data?.map(
    (item) => item.category.id ?? []
  );
  const {} = useMany<ICategory>({
    resource: "categories",
    ids: categoryIds,
    queryOptions: {
      enabled: categoryIds?.length > 0,
    },
  });
  return (
    <List>
      <Table {...tableQueryResult} rowKey={"id"}>
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
      </Table>
    </List>
  );
};
