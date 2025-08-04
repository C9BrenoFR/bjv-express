
import ManagementTable from '@/components/management-table';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Pagination } from '@/types/pagination';
import { Head } from '@inertiajs/react';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Pacotes',
        href: '/admin/packages',
    },
];

interface PageProps {
    packages: any
    pagination: Pagination
}

export default function PackagesPage({ packages, pagination }: PageProps) {
    console.log('Packages data:', packages);

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Pacotes" />
            <div className="flex h-full flex-1 flex-col gap-4 rounded-xl p-4 overflow-x-auto">
                <ManagementTable
                    data={packages}
                    data_keys={{
                        keys: ['code', 'formatted_address', 'status'],
                        headers: ['CODIGO', 'DESTINO', 'STATUS']
                    }}
                    pagination={pagination}
                    actions={{
                        view: true,
                        add: true,
                        link: '/admin/packages/'
                    }}
                />
            </div>
        </AppLayout>
    );
}
