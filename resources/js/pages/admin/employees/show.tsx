import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head, Link } from '@inertiajs/react';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Funcionários',
        href: '/admin/employees',
    },
    {
        title: 'Visualizar',
        href: '#',
    },
];

interface Unit {
    id: number;
    name: string;
}

interface Employee {
    id: number;
    name: string;
    email: string;
    role: string;
    unit: Unit;
    created_at: string;
    updated_at: string;
}

interface PageProps {
    employee: Employee;
}

export default function ShowEmployeePage({ employee }: PageProps) {
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title={`Funcionário: ${employee.name}`} />
            <div className="flex h-full flex-1 flex-col gap-4 rounded-xl p-4">                <div className="bg-[#404040] shadow sm:rounded-lg">
                <div className="px-4 py-5 sm:p-6">
                    <div className="flex justify-between items-center mb-6">
                        <h3 className="text-lg font-medium leading-6 text-white">
                            Detalhes do Funcionário
                        </h3>
                        <div className="flex space-x-3">
                            <Link
                                href={route('admin.employees.edit', employee.id)}
                                className="bg-yellow-600 hover:bg-yellow-700 text-white font-bold py-2 px-4 rounded"
                            >
                                Editar
                            </Link>
                            <Link
                                href={route('admin.employees')}
                                className="bg-[#262626] hover:bg-gray-600 text-white font-bold py-2 px-4 rounded"
                            >
                                Voltar
                            </Link>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                            <label className="block text-sm font-medium text-gray-300">
                                ID
                            </label>
                            <p className="mt-1 text-sm text-white">
                                {employee.id}
                            </p>
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-300">
                                Nome
                            </label>
                            <p className="mt-1 text-sm text-white">
                                {employee.name}
                            </p>
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-300">
                                Email
                            </label>
                            <p className="mt-1 text-sm text-white">
                                {employee.email}
                            </p>
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-300">
                                Cargo
                            </label>
                            <p className="mt-1 text-sm text-white">
                                {employee.role}
                            </p>
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-300">
                                Unidade
                            </label>
                            <p className="mt-1 text-sm text-white">
                                {employee.unit?.name || 'Não informado'}
                            </p>
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-300">
                                Data de Criação
                            </label>
                            <p className="mt-1 text-sm text-white">
                                {new Date(employee.created_at).toLocaleDateString('pt-BR')}
                            </p>
                        </div>
                    </div>
                </div>
            </div>
            </div>
        </AppLayout>
    );
}
