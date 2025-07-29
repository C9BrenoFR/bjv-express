
interface TableCellProps {
    children: React.ReactNode
}

export default function TableRow({ children }: TableCellProps) {
    return (
        <tr className="border-t border-[#262626]">{children}</tr>
    );
};
