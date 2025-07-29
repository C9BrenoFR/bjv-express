
interface TableCellProps {
    children: React.ReactNode
}

export default function TableCell({ children }: TableCellProps) {
    return (
        <td className="pl-2 h-16">{children}</td>
    );
};
