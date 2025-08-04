import { Input } from '@/components/ui/input';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head, useForm } from '@inertiajs/react';
import { FormEventHandler } from 'react';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Funcionários',
        href: '/admin/employees',
    },
    {
        title: 'Editar',
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
    unit_id: number;
}

interface PageProps {
    employee: Employee;
    units: Unit[];
}

export default function EditEmployeePage({ employee, units }: PageProps) {
    const { data, setData, put, processing, errors } = useForm({
        name: employee.name,
        email: employee.email,
        password: '',
        password_confirmation: '',
        role: employee.role.toString(),
        unit_id: employee.unit_id.toString(),
    });

    const submit: FormEventHandler = (e) => {
        e.preventDefault();
        put(route('admin.employees.update', employee.id));
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title={`Editar Funcionário: ${employee.name}`} />
            <div className="flex h-full flex-1 flex-col gap-4 rounded-xl p-4">
                <div className="bg-[#404040] shadow sm:rounded-lg">
                    <div className="px-4 py-5 sm:p-6">
                        <h3 className="text-lg font-medium leading-6 text-white mb-4">
                            Editar Funcionário
                        </h3>

                        <form onSubmit={submit} className="space-y-6">
                            <div>
                                <label htmlFor="name" className="block text-sm font-medium text-gray-300">
                                    Nome
                                </label>
                                <Input
                                    id="name"
                                    name="name"
                                    value={data.name}
                                    className="mt-1 bg-[#262626] border-gray-600 text-white"
                                    onChange={(e) => setData('name', e.target.value)}
                                    required
                                />
                                {errors.name && <div className="text-red-400 text-sm mt-1">{errors.name}</div>}
                            </div>

                            <div>
                                <label htmlFor="email" className="block text-sm font-medium text-gray-300">
                                    Email
                                </label>
                                <Input
                                    id="email"
                                    type="email"
                                    name="email"
                                    value={data.email}
                                    className="mt-1 bg-[#262626] border-gray-600 text-white"
                                    onChange={(e) => setData('email', e.target.value)}
                                    required
                                />
                                {errors.email && <div className="text-red-400 text-sm mt-1">{errors.email}</div>}
                            </div>

                            <div>
                                <label htmlFor="password" className="block text-sm font-medium text-gray-300">
                                    Nova Senha (deixe em branco para manter a atual)
                                </label>
                                <Input
                                    id="password"
                                    type="password"
                                    name="password"
                                    value={data.password}
                                    className="mt-1 bg-[#262626] border-gray-600 text-white"
                                    onChange={(e) => setData('password', e.target.value)}
                                />
                                {errors.password && <div className="text-red-400 text-sm mt-1">{errors.password}</div>}
                            </div>

                            <div>
                                <label htmlFor="password_confirmation" className="block text-sm font-medium text-gray-300">
                                    Confirmar Nova Senha
                                </label>
                                <Input
                                    id="password_confirmation"
                                    type="password"
                                    name="password_confirmation"
                                    value={data.password_confirmation}
                                    className="mt-1 bg-[#262626] border-gray-600 text-white"
                                    onChange={(e) => setData('password_confirmation', e.target.value)}
                                />
                                {errors.password_confirmation && <div className="text-red-400 text-sm mt-1">{errors.password_confirmation}</div>}
                            </div>

                            <div>
                                <label htmlFor="role" className="block text-sm font-medium text-gray-300">
                                    Cargo
                                </label>
                                <select
                                    id="role"
                                    name="role"
                                    value={data.role}
                                    className="mt-1 block w-full rounded-md border border-gray-600 bg-[#262626] py-2 px-3 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm text-white"
                                    onChange={(e) => setData('role', e.target.value)}
                                    required
                                >
                                    <option value="">Selecione um cargo</option>
                                    <option value="0">Administrador</option>
                                    <option value="1">Operador</option>
                                    <option value="2">Entregador</option>
                                </select>
                                {errors.role && <div className="text-red-400 text-sm mt-1">{errors.role}</div>}
                            </div>

                            <div>
                                <label htmlFor="unit_id" className="block text-sm font-medium text-gray-300">
                                    Unidade
                                </label>
                                <select
                                    id="unit_id"
                                    name="unit_id"
                                    value={data.unit_id}
                                    className="mt-1 block w-full rounded-md border border-gray-600 bg-[#262626] py-2 px-3 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm text-white"
                                    onChange={(e) => setData('unit_id', e.target.value)}
                                    required
                                >
                                    <option value="">Selecione uma unidade</option>
                                    {units.map((unit) => (
                                        <option key={unit.id} value={unit.id}>
                                            {unit.name}
                                        </option>
                                    ))}
                                </select>
                                {errors.unit_id && <div className="text-red-400 text-sm mt-1">{errors.unit_id}</div>}
                            </div>

                            <div className="flex justify-end space-x-3">
                                <button
                                    type="button"
                                    className="bg-[#262626] hover:bg-gray-600 text-white font-bold py-2 px-4 rounded"
                                    onClick={() => window.history.back()}
                                >
                                    Cancelar
                                </button>
                                <button
                                    type="submit"
                                    disabled={processing}
                                    className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded disabled:opacity-50"
                                >
                                    {processing ? 'Salvando...' : 'Salvar Alterações'}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </AppLayout>
    );
}
