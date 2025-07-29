
interface TableHeaderProps {
    children: string
}

export default function TableHeader({ children }: TableHeaderProps) {
    return (
        <th className="text-start  pl-2 h-16">{children}</th>
    );
};
