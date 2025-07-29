import { Pagination as PaginationProps } from "@/types/pagination";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { router } from "@inertiajs/react";

export default function Pagination({ current_page, last_page }: PaginationProps) {
    const getVisiblePages = () => {
        const pages = [];

        // Sempre mostrar página 1
        if (last_page > 0) {
            pages.push(1);
        }

        // Determinar o range de páginas centrais (agora 5 páginas)
        let start = Math.max(2, current_page - 2);
        let end = Math.min(last_page - 1, current_page + 2);

        if (end - start < 4) {
            if (start === 2) {
                end = Math.min(last_page - 1, start + 4);
            } else if (end === last_page - 1) {
                start = Math.max(2, end - 4);
            }
        }

        if (start > 2) {
            pages.push('...');
        }

        // Adicionar páginas centrais
        for (let i = start; i <= end; i++) {
            if (i !== 1 && i !== last_page) {
                pages.push(i);
            }
        }

        // Adicionar "..." se necessário depois das páginas centrais
        if (end < last_page - 1) {
            pages.push('...');
        }

        // Sempre mostrar última página
        if (last_page > 1) {
            pages.push(last_page);
        }

        return pages;
    };

    const handlePageChange = (page: number) => {
        if (page !== current_page && page >= 1 && page <= last_page) {
            router.get(window.location.pathname, { page }, {
                preserveState: true,
                preserveScroll: true
            });
        }
    };

    const visiblePages = getVisiblePages();

    return (
        <div className="flex items-center justify-center mt-4">
            <button
                disabled={current_page === 1}
                onClick={() => handlePageChange(current_page - 1)}
                className="flex h-8 w-8 items-center justify-center rounded-l border border-[#262626] bg-[#404040] text-white transition-colors hover:bg-[#505050] disabled:opacity-50 disabled:cursor-not-allowed"
            >
                <ChevronLeft className="h-4 w-4" />
            </button>

            {visiblePages.map((page, index) => (
                <div key={index}>
                    {page === '...' ? (
                        <span className="flex h-8 w-8 items-center justify-center border border-[#262626] bg-[#404040] text-white">
                            ...
                        </span>
                    ) : (
                        <button
                            onClick={() => handlePageChange(page as number)}
                            className={`flex h-8 w-8 items-center justify-center border border-[#262626] transition-colors ${current_page === page
                                ? 'bg-blue-600 text-white'
                                : 'bg-[#404040] text-white hover:bg-[#505050]'
                                }`}
                        >
                            {page}
                        </button>
                    )}
                </div>
            ))}

            {/* Botão Próximo */}
            <button
                disabled={current_page === last_page}
                onClick={() => handlePageChange(current_page + 1)}
                className="flex h-8 w-8 items-center justify-center rounded-r border border-[#262626] bg-[#404040] text-white transition-colors hover:bg-[#505050] disabled:opacity-50 disabled:cursor-not-allowed"
            >
                <ChevronRight className="h-4 w-4" />
            </button>
        </div>
    );
};
