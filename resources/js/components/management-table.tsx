import { Pagination as PaginationType } from "@/types/pagination";
import { Actions, BaseEntity, DataKeys } from "@/types/table-types";
import Table from "./table/table";
import Pagination from "./pagination";
import { Link } from "@inertiajs/react";
import { Plus } from "lucide-react";

interface ManagementTableProps<T extends BaseEntity> {
    data: T[]
    data_keys: DataKeys<T>
    pagination: PaginationType
    actions: Actions
}

export default function ManagementTable<T extends BaseEntity>({ data, data_keys, pagination, actions }: ManagementTableProps<T>) {
    return (
        <>
            {actions.add && (
                <div className="flex justify-end mb-4">
                    <Link
                        href={actions.link + "create"}
                        className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg flex items-center gap-2 transition-colors"
                    >
                        <Plus size={16} />
                        Adicionar
                    </Link>
                </div>
            )}
            <Table
                data={data}
                data_keys={data_keys}
                actions={actions}
            />
            <Pagination {...pagination} />
        </>
    );
};
