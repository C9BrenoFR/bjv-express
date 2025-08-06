import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head, Link } from '@inertiajs/react';
import { Building2, Package } from 'lucide-react';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Minhas Entregas',
        href: '/deliver',
    },
    {
        title: 'Seleção de Unidade',
        href: '/deliver/unit',
    },
];

interface Unit {
    id: number;
    title: string;
    address?: {
        city: string;
        state: string;
    };
}

interface PageProps {
    units: Unit[]
}

export default function Index({ units }: PageProps) {
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Selecionar Unidade" />
            <div className="flex h-full flex-1 flex-col gap-6 rounded-xl p-6">
                {/* Header */}
                <div className="flex items-center gap-4 bg-[#404040] p-4 rounded-lg">
                    <div className="flex-1">
                        <h1 className="text-xl font-semibold text-white">
                            Selecione uma Unidade
                        </h1>
                        <p className="text-gray-400 text-sm">
                            Escolha a unidade para coletar pacotes
                        </p>
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {units.map((unit) => (
                        <Link
                            key={unit.id}
                            href={`/deliver/unit/${unit.id}`}
                            className="bg-[#404040] hover:bg-[#4a4a4a] rounded-lg p-6 transition-colors duration-200 group"
                        >
                            <div className="flex items-center gap-4 mb-4">
                                <div className="bg-blue-600 p-3 rounded-lg group-hover:bg-blue-700 transition-colors">
                                    <Building2 size={24} className="text-white" />
                                </div>
                                <div>
                                    <h3 className="text-lg font-semibold text-white">{unit.title}</h3>
                                    {unit.address && (
                                        <p className="text-sm text-gray-400">
                                            {unit.address.city}, {unit.address.state}
                                        </p>
                                    )}
                                </div>
                            </div>

                            <div className="flex items-center justify-between">
                                <div className="flex items-center gap-2 text-gray-300">
                                    <Package size={16} />
                                    <span className="text-sm">Ver pacotes</span>
                                </div>
                                <div className="text-blue-400 group-hover:text-blue-300 transition-colors">
                                    →
                                </div>
                            </div>
                        </Link>
                    ))}
                </div>

                {units.length === 0 && (
                    <div className="text-center py-12">
                        <Building2 size={64} className="text-gray-600 mx-auto mb-4" />
                        <h3 className="text-xl font-semibold text-gray-400 mb-2">
                            Nenhuma unidade encontrada
                        </h3>
                        <p className="text-gray-500">
                            Não há unidades disponíveis no momento.
                        </p>
                    </div>
                )}
            </div>
        </AppLayout>
    );
}
