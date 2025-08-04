import { Pagination as PaginationType } from "@/types/pagination";
import { Actions, BaseEntity, DataKeys } from "@/types/table-types";
import Table from "./table/table";
import Pagination from "./pagination";
import SearchInput from "./search-input";
import { Link } from "@inertiajs/react";
import { Plus } from "lucide-react";

interface ManagementTableProps<T extends BaseEntity> {
    data: T[]
    data_keys: DataKeys<T>
    pagination: PaginationType
    actions: Actions
    searchable?: boolean
    searchPlaceholder?: string
    searchValue?: string
}

export default function ManagementTable<T extends BaseEntity>({
    data,
    data_keys,
    pagination,
    actions,
    searchable = true,
    searchPlaceholder = "Pesquisar...",
    searchValue = ""
}: ManagementTableProps<T>) {
    return (
        <>
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-4 gap-4">
                {searchable && (
                    <div className="w-full md:flex-1 md:max-w-md">
                        <SearchInput
                            placeholder={searchPlaceholder}
                            initialValue={searchValue}
                        />
                    </div>
                )}

                {actions.add && (
                    <Link
                        href={actions.link + "create"}
                        className="w-full md:w-auto bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg flex items-center justify-center gap-2 transition-colors whitespace-nowrap"
                    >
                        <Plus size={16} />
                        Adicionar
                    </Link>
                )}
            </div>

            <Table
                data={data}
                data_keys={data_keys}
                actions={actions}
            />
            <Pagination {...pagination} />
        </>
    );
};
