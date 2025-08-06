import ManagementTable from '@/components/management-table';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Pagination } from '@/types/pagination';
import { Head, Link } from '@inertiajs/react';
import { ArrowLeft } from 'lucide-react';
import { useState } from 'react';
import RecieveModal from '@/components/recieve-modal';

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
}

export default function ConfirmPackages({ packages, pagination, search }: PageProps) {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedPackage, setSelectedPackage] = useState<PackageData | null>(null);

    const breadcrumbs: BreadcrumbItem[] = [
        {
            title: 'Pacotes',
            href: '/operator',
        },
        {
            title: 'Confirmar pacote',
            href: '/confirm',
        },
    ];

    const handleCollect = (packageItem: PackageData) => {
        setSelectedPackage(packageItem);
        setIsModalOpen(true);
    };

    console.log('Packages data:', packages);

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Pacotes deixados nessa agência" />
            <div className="flex h-full flex-1 flex-col gap-4 rounded-xl p-4 overflow-x-auto">
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
                            Confirmar recebimento de pacotes nesta agência
                        </h1>
                        <p className="text-gray-400 text-sm">
                            Pacotes disponíveis para recebimento
                        </p>
                    </div>
                </div>

                <ManagementTable
                    data={packages}
                    data_keys={{
                        keys: ['code', 'formatted_address', 'step'],
                        headers: ['CODIGO', 'DESTINO', 'PASSO']
                    }}
                    pagination={pagination}
                    actions={{
                        view: true,
                        collect: true,
                        add: false,
                        link: '/operator/packages/'
                    }}
                    searchable={true}
                    searchPlaceholder="Pesquisar por código"
                    searchValue={search}
                    onCollect={handleCollect}
                />

                <RecieveModal
                    isOpen={isModalOpen}
                    onClose={() => setIsModalOpen(false)}
                    package={selectedPackage}
                />
            </div>
        </AppLayout>
    );
}

