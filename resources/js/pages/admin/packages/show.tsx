import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head, Link } from '@inertiajs/react';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Pacotes',
        href: '/admin/packages',
    },
    {
        title: 'Visualizar',
        href: '#',
    },
];

interface Address {
    id: number;
    street: string;
    number: string;
    city: string;
    state: string;
    zip_code: string;
    complement?: string;
}

interface Package {
    id: number;
    width: number;
    height: number;
    depth: number;
    weight: number;
    address: Address;
    created_at: string;
    updated_at: string;
}

interface PageProps {
    package: Package;
}

export default function ShowPackagePage({ package: pkg }: PageProps) {
    const formatAddress = (address: Address) => {
        const complement = address.complement ? `, ${address.complement}` : '';
        return `${address.street}, ${address.number}${complement}, ${address.city} - ${address.state}, ${address.zip_code}`;
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title={`Pacote #${pkg.id}`} />
            <div className="flex h-full flex-1 flex-col gap-4 rounded-xl p-4">
                <div className="bg-[#404040] shadow sm:rounded-lg">
                    <div className="px-4 py-5 sm:p-6">
                        <div className="flex justify-between items-center mb-6">
                            <h3 className="text-lg font-medium leading-6 text-white">
                                Detalhes do Pacote #{pkg.id}
                            </h3>
                            <div className="flex space-x-3">
                                <Link
                                    href={route('admin.packages.edit', pkg.id)}
                                    className="bg-yellow-600 hover:bg-yellow-700 text-white font-bold py-2 px-4 rounded"
                                >
                                    Editar
                                </Link>
                                <Link
                                    href={route('admin.packages')}
                                    className="bg-[#262626] hover:bg-gray-600 text-white font-bold py-2 px-4 rounded"
                                >
                                    Voltar
                                </Link>
                            </div>
                        </div>

                        <div className="space-y-8">
                            {/* Informações do Pacote */}
                            <div>
                                <h4 className="text-md font-medium text-white mb-4">
                                    Dimensões e Peso
                                </h4>
                                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-300">
                                            Largura
                                        </label>
                                        <p className="mt-1 text-sm text-white">
                                            {pkg.width} cm
                                        </p>
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-gray-300">
                                            Altura
                                        </label>
                                        <p className="mt-1 text-sm text-white">
                                            {pkg.height} cm
                                        </p>
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-gray-300">
                                            Profundidade
                                        </label>
                                        <p className="mt-1 text-sm text-white">
                                            {pkg.depth} cm
                                        </p>
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-gray-300">
                                            Peso
                                        </label>
                                        <p className="mt-1 text-sm text-white">
                                            {pkg.weight} kg
                                        </p>
                                    </div>
                                </div>
                            </div>

                            {/* Endereço de Destino */}
                            <div>
                                <h4 className="text-md font-medium text-white mb-4">
                                    Endereço de Destino
                                </h4>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-300">
                                            Endereço Completo
                                        </label>
                                        <p className="mt-1 text-sm text-white">
                                            {formatAddress(pkg.address)}
                                        </p>
                                    </div>

                                    <div className="grid grid-cols-2 gap-4">
                                        <div>
                                            <label className="block text-sm font-medium text-gray-300">
                                                Cidade
                                            </label>
                                            <p className="mt-1 text-sm text-white">
                                                {pkg.address.city}
                                            </p>
                                        </div>

                                        <div>
                                            <label className="block text-sm font-medium text-gray-300">
                                                Estado
                                            </label>
                                            <p className="mt-1 text-sm text-white">
                                                {pkg.address.state}
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Informações Adicionais */}
                            <div>
                                <h4 className="text-md font-medium text-white mb-4">
                                    Informações Adicionais
                                </h4>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-300">
                                            Data de Criação
                                        </label>
                                        <p className="mt-1 text-sm text-white">
                                            {new Date(pkg.created_at).toLocaleDateString('pt-BR')} às {new Date(pkg.created_at).toLocaleTimeString('pt-BR')}
                                        </p>
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-gray-300">
                                            Última Atualização
                                        </label>
                                        <p className="mt-1 text-sm text-white">
                                            {new Date(pkg.updated_at).toLocaleDateString('pt-BR')} às {new Date(pkg.updated_at).toLocaleTimeString('pt-BR')}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </AppLayout>
    );
}
