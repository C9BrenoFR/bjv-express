import ManagementTable from '@/components/management-table';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Pagination } from '@/types/pagination';
import { Head, Link } from '@inertiajs/react';
import { Package, PackagePlus } from 'lucide-react';
import { useState } from 'react';

// Import the delivery modal component
import DeliveryModal from '../../components/delivery-modal';

interface Unit {
    id: number;
    title: string;
    address?: {
        street: string;
        city: string;
        state: string;
    };
}

interface PackageData {
    id: number;
    code: string;
    formatted_address: string;
    status: string;
    step?: string;
    unit_title?: string;
}

interface PageProps {
    packages: PackageData[];
    pagination: Pagination;
    search: string;
    units: Unit[];
}

export default function MyDeliveries({ packages, pagination, search, units }: PageProps) {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedPackage, setSelectedPackage] = useState<PackageData | null>(null);

    const breadcrumbs: BreadcrumbItem[] = [
        {
            title: 'Minhas Entregas',
            href: '/deliver',
        },
    ];

    const handleDelivery = (packageItem: PackageData) => {
        setSelectedPackage(packageItem);
        setIsModalOpen(true);
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Minhas Entregas" />
            <div className="flex h-full flex-1 flex-col gap-4 rounded-xl p-4 overflow-x-auto">
                {/* Header */}
                <div className="flex items-center gap-4 bg-[#404040] p-4 rounded-lg">
                    <div className="flex-1">
                        <h1 className="text-xl font-semibold text-white">
                            Minhas Entregas
                        </h1>
                        <p className="text-gray-400 text-sm">
                            Pacotes sob sua responsabilidade
                        </p>
                    </div>
                    <Link
                        href="/deliver/unit"
                        className="flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors"
                    >
                        <PackagePlus size={16} />
                        <span>Coletar Pacotes</span>
                    </Link>
                </div>

                <ManagementTable
                    data={packages}
                    data_keys={{
                        keys: ['code', 'formatted_address', 'status', 'step'],
                        headers: ['CÓDIGO', 'DESTINO', 'STATUS', 'PASSO ATUAL']
                    }}
                    pagination={pagination}
                    actions={{
                        view: true,
                        deliver: true,
                        add: false,
                        link: '/deliver/'
                    }}
                    searchable={true}
                    searchPlaceholder="Pesquisar por código ou endereço"
                    searchValue={search}
                    onDelivery={handleDelivery}
                />

                <DeliveryModal
                    isOpen={isModalOpen}
                    onClose={() => setIsModalOpen(false)}
                    package={selectedPackage}
                    units={units}
                />
            </div>
        </AppLayout>
    );
}
