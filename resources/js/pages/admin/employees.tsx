
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
    employees: any
    pagination: Pagination
}

export default function EmployeesPage({ employees, pagination }: PageProps) {

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Pacotes" />
            <div className="flex h-full flex-1 flex-col gap-4 rounded-xl p-4 overflow-x-auto">
                <ManagementTable
                    data={employees}
                    data_keys={{
                        keys: ['id', 'name', 'role', 'email'],
                        headers: ['#', 'NOME', 'CARGO', 'EMAIL']
                    }}
                    pagination={pagination}
                    actions={{
                        view: true,
                        edit: true,
                        delete: true,
                        link: '/admin/employees/'
                    }}
                />
            </div>
        </AppLayout>
    );
}
