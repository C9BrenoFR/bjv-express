import ManagementTable from '@/components/management-table';
import CollectModal from '../../components/collect-modal';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Pagination } from '@/types/pagination';
import { Head, Link } from '@inertiajs/react';
import { ArrowLeft } from 'lucide-react';
import { useState } from 'react';

interface Unit {
    id: number;
    title: string;
}

interface PackageData {
    id: number;
    code: string;
    formatted_address: string;
    status: string;
}

interface PageProps {
    packages: PackageData[]
    pagination: Pagination
    search: string
    unit: Unit
}

export default function Dashboard({ packages, pagination, search, unit }: PageProps) {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedPackage, setSelectedPackage] = useState<PackageData | null>(null);

    const breadcrumbs: BreadcrumbItem[] = [
        {
            title: 'Minhas Entregas',
            href: '/deliver',
        },
        {
            title: 'Seleção de Unidade',
            href: '/deliver/unit',
        },
        {
            title: unit.title,
            href: `/deliver/unit/${unit.id}`,
        },
    ];

    const handleCollect = (packageItem: PackageData) => {
        setSelectedPackage(packageItem);
        setIsModalOpen(true);
    };

    console.log('Packages data:', packages);

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title={`Coletar Pacotes - ${unit.title}`} />
            <div className="flex h-full flex-1 flex-col gap-4 rounded-xl p-4 overflow-x-auto">
                {/* Header with back button and unit info */}
                <div className="flex items-center gap-4 bg-[#404040] p-4 rounded-lg">
                    <Link
                        href="/deliver/unit"
                        className="flex items-center gap-2 text-gray-300 hover:text-white transition-colors"
                    >
                        <ArrowLeft size={20} />
                        <span>Voltar</span>
                    </Link>
                    <div className="flex-1">
                        <h1 className="text-xl font-semibold text-white">
                            Pacotes da Unidade: {unit.title}
                        </h1>
                        <p className="text-gray-400 text-sm">
                            Pacotes disponíveis para coleta
                        </p>
                    </div>
                </div>

                <ManagementTable
                    data={packages}
                    data_keys={{
                        keys: ['code', 'formatted_address', 'status'],
                        headers: ['CODIGO', 'DESTINO', 'STATUS']
                    }}
                    pagination={pagination}
                    actions={{
                        view: true,
                        collect: true,
                        add: false,
                        link: '/deliver/'
                    }}
                    searchable={true}
                    searchPlaceholder="Pesquisar por código"
                    searchValue={search}
                    onCollect={handleCollect}
                />

                <CollectModal
                    isOpen={isModalOpen}
                    onClose={() => setIsModalOpen(false)}
                    package={selectedPackage}
                />
            </div>
        </AppLayout>
    );
}

