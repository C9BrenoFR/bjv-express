import { Pagination as PaginationType } from "@/types/pagination";
import { Actions, BaseEntity, DataKeys } from "@/types/table-types";
import Table from "./table/table";
import Pagination from "./pagination";

interface ManagementTableProps<T extends BaseEntity> {
    data: T[]
    data_keys: DataKeys<T>
    pagination: PaginationType
    actions: Actions
}

export default function ManagementTable<T extends BaseEntity>({ data, data_keys, pagination, actions }: ManagementTableProps<T>) {
    return (
        <>
            <Table
                data={data}
                data_keys={data_keys}
                actions={actions}
            />
            <Pagination {...pagination} />
        </>
    );
};
