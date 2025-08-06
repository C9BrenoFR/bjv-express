import ManagementTable from '@/components/management-table';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Pagination } from '@/types/pagination';
import { Head, Link } from '@inertiajs/react';
import { Info, Package, PackagePlus } from 'lucide-react';
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
                    empty_message={(
                        <div className="flex items-center justify-evenly gap-10">
                            <span className='flex gap-2'>
                                <Info />
                                Você não possui pacotes sob sua responsabilidade
                            </span>
                            <Link
                                href="/deliver/unit"
                                className="flex items-center gap-2 px-4 py-2 border border-white text-white hover:border-transparent hover:bg-white hover:text-black rounded-lg transition-colors"
                            >
                                <PackagePlus size={16} />
                                <span>Coletar Pacotes</span>
                            </Link>
                        </div>
                    )}
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
