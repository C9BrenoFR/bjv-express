import { LucideIcon } from "lucide-react";

interface ActionButtonProps {
    Icon: LucideIcon
    link: string
}

export default function ActionButton({ Icon, link }: ActionButtonProps) {
    return (
        <a href={link} className="inline-flex h-8 w-10 items-center justify-center rounded bg-[#262626]">
            <Icon />
        </a>
    );
};
