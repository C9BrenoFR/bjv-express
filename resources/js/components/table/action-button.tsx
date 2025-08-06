import { LucideIcon } from "lucide-react";
import { Link } from "@inertiajs/react";

interface ActionButtonProps {
    Icon: LucideIcon
    link: string
    method?: 'get' | 'post' | 'put' | 'patch' | 'delete'
    onlyIcon?: boolean
    className?: string
    onClick?: () => void
}

export default function ActionButton({
    Icon,
    link,
    method = 'get',
    onlyIcon = true,
    className = '',
    onClick
}: ActionButtonProps) {
    const baseClasses = "inline-flex h-8 w-10 items-center justify-center rounded bg-[#262626] hover:bg-[#404040] transition-colors";
    const combinedClasses = `${baseClasses} ${className}`;

    if (method === 'delete') {
        return (
            <Link
                href={link}
                method="delete"
                as="button"
                className={combinedClasses}
                onClick={onClick}
                onBefore={() => confirm('Tem certeza que deseja deletar este item?')}
            >
                <Icon size={16} />
            </Link>
        );
    }

    if (method === 'post') {
        return (
            <Link
                href={link}
                method="post"
                as="button"
                className={combinedClasses}
                onClick={onClick}
                onBefore={() => confirm('Tem certeza que deseja coletar este pacote?')}
            >
                <Icon size={16} />
            </Link>
        );
    }

    return (
        <Link href={link} className={combinedClasses} onClick={onClick}>
            <Icon size={16} />
        </Link>
    );
};
