import { Input } from '@/components/ui/input';
import { Search, X } from 'lucide-react';
import { useState, useEffect } from 'react';
import { router } from '@inertiajs/react';

interface SearchInputProps {
    placeholder?: string;
    initialValue?: string;
    onSearch?: (query: string) => void;
    className?: string;
}

export default function SearchInput({
    placeholder = "Pesquisar...",
    initialValue = "",
    onSearch,
    className = ""
}: SearchInputProps) {
    const [searchQuery, setSearchQuery] = useState(initialValue);
    const [debounceTimer, setDebounceTimer] = useState<NodeJS.Timeout | null>(null);

    useEffect(() => {
        // Clear existing timer
        if (debounceTimer) {
            clearTimeout(debounceTimer);
        }

        // Set new timer
        const timer = setTimeout(() => {
            if (onSearch) {
                onSearch(searchQuery);
            } else {
                // Default behavior: update URL params
                const url = new URL(window.location.href);
                if (searchQuery.trim()) {
                    url.searchParams.set('search', searchQuery);
                } else {
                    url.searchParams.delete('search');
                }
                url.searchParams.delete('page'); // Reset to first page when searching

                router.get(url.pathname + url.search, {}, {
                    preserveState: true,
                    preserveScroll: true,
                    replace: true
                });
            }
        }, 500); // 500ms debounce

        setDebounceTimer(timer);

        // Cleanup
        return () => {
            if (timer) {
                clearTimeout(timer);
            }
        };
    }, [searchQuery]);

    const clearSearch = () => {
        setSearchQuery("");
    };

    return (
        <div className={`relative ${className}`}>
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
            <Input
                type="text"
                placeholder={placeholder}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 pr-10 bg-[#262626] border-gray-600 text-white placeholder-gray-400 focus:border-blue-500 focus:ring-blue-500"
            />
            {searchQuery && (
                <button
                    onClick={clearSearch}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-white transition-colors"
                    type="button"
                >
                    <X className="h-4 w-4" />
                </button>
            )}
        </div>
    );
}
