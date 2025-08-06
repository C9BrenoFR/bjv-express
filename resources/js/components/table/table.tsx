import { Actions, BaseEntity, DataKeys } from "@/types/table-types";
import TableHeader from "./table-header";
import TableRow from "./table-row";
import TableCell from "./table-cell";
import ActionButton from "./action-button";
import { Eye, Pencil, Trash, Check, PackageCheck, Info } from "lucide-react";

interface TableProps<T extends BaseEntity> {
    data: T[]
    data_keys: DataKeys<T>
    actions: Actions
    empty_message?: React.ReactNode
    onDelivery?: (item: T) => void
    onCollect?: (item: T) => void
}
export default function Table<T extends BaseEntity>({ data, data_keys, actions, onDelivery, onCollect, empty_message = (<span className='flex gap-2'><Info />Nenhum item encontrado</span>) }: TableProps<T>) {
    return (
        <table className="w-full bg-[#404040] rounded-b-2xl rounded-tl-2xl">
            <thead>
                <tr>
                    {data_keys.headers.map((header, index) => (
                        <TableHeader key={index}>{String(header)}</TableHeader>
                    ))}
                    <TableHeader>AÇÕES</TableHeader>
                </tr>
            </thead>
            <tbody>
                {data.length > 0 ?
                    data.map((data, index) => (
                        <TableRow key={index}>
                            {data_keys.keys.map((key, i) => (
                                <TableCell key={i}>{String(data[key])}</TableCell>
                            ))}
                            <TableCell>
                                <div className="flex gap-1">
                                    {actions.view && <ActionButton link={actions.link + "view/" + data.id} Icon={Eye} />}
                                    {actions.edit && <ActionButton link={actions.link + "edit/" + data.id} Icon={Pencil} />}
                                    {actions.delete && <ActionButton link={actions.link + data.id} Icon={Trash} method="delete" />}
                                    {actions.collect && onCollect && (
                                        <button
                                            onClick={() => onCollect(data)}
                                            className="inline-flex h-8 w-10 items-center justify-center rounded bg-green-600 hover:bg-green-700 transition-colors"
                                            title="Coletar"
                                        >
                                            <Check size={16} />
                                        </button>
                                    )}
                                    {actions.deliver && onDelivery && (
                                        <button
                                            onClick={() => onDelivery(data)}
                                            className="inline-flex h-8 w-10 items-center justify-center rounded bg-blue-600 hover:bg-blue-700 transition-colors"
                                            title="Entregar"
                                        >
                                            <PackageCheck size={16} />
                                        </button>
                                    )}
                                </div>
                            </TableCell>
                        </TableRow>
                    )) : (
                        <TableRow>
                            <TableCell colSpan={data_keys.headers.length + 1} className="text-gray-400">
                                <div className="flex items-center-center justify-center">
                                    {empty_message}
                                </div>
                            </TableCell>
                        </TableRow>
                    )
                }
            </tbody>
        </table>
    );
};
