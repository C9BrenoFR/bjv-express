import { Actions, BaseEntity, DataKeys } from "@/types/table-types";
import TableHeader from "./table-header";
import TableRow from "./table-row";
import TableCell from "./table-cell";
import ActionButton from "./action-button";
import { Eye, Pencil, Trash } from "lucide-react";

interface TableProps<T extends BaseEntity> {
    data: T[]
    data_keys: DataKeys<T>
    actions: Actions
}

export default function Table<T extends BaseEntity>({ data, data_keys, actions }: TableProps<T>) {
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
                                    {actions.view && <ActionButton link={actions.link + data.id} Icon={Eye} />}
                                    {actions.edit && <ActionButton link={actions.link + data.id} Icon={Pencil} />}
                                    {actions.delete && <ActionButton link={actions.link + data.id} Icon={Trash} />}
                                </div>
                            </TableCell>
                        </TableRow>
                    )) : (
                        <TableRow>
                            <td className="text-center">
                                Nenhum pacote encontrado
                            </td>
                        </TableRow>
                    )
                }
            </tbody>
        </table>
    );
};
