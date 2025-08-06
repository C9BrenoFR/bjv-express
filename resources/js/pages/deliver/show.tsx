import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head, Link } from '@inertiajs/react';
import { ArrowLeft, Package, MapPin, Ruler, Weight, Calendar, Building, FileText } from 'lucide-react';

interface PackageData {
    id: number;
    code: string;
    width: number;
    height: number;
    depth: number;
    weight: number;
    formatted_address: string;
    status: string;
    step: string;
    unit_title: string;
    created_at: string;
    updated_at: string;
}

interface PageProps {
    package: PackageData;
}

export default function Show({ package: packageData }: PageProps) {
    const breadcrumbs: BreadcrumbItem[] = [
        {
            title: 'Minhas Entregas',
            href: '/deliver',
        },
        {
            title: `Pacote #${packageData.code}`,
            href: `/deliver/view/${packageData.id}`,
        },
    ];

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title={`Pacote #${packageData.code}`} />
            <div className="flex h-full flex-1 flex-col gap-6 rounded-xl p-6">
                {/* Header */}
                <div className="flex items-center gap-4 bg-[#404040] p-4 rounded-lg">
                    <Link
                        href="/deliver"
                        className="flex items-center gap-2 text-gray-300 hover:text-white transition-colors"
                    >
                        <ArrowLeft size={20} />
                        <span>Voltar</span>
                    </Link>
                    <div className="flex-1">
                        <h1 className="text-xl font-semibold text-white flex items-center gap-2">
                            <Package size={24} />
                            Pacote #{packageData.code}
                        </h1>
                        <p className="text-gray-400 text-sm">
                            Detalhes do pacote em entrega
                        </p>
                    </div>
                    <div className="px-3 py-1 bg-blue-600 text-white text-sm rounded-full">
                        {packageData.status}
                    </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    {/* Informações do Pacote */}
                    <div className="bg-[#404040] rounded-lg p-6">
                        <h2 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
                            <Package size={20} />
                            Informações do Pacote
                        </h2>

                        <div className="space-y-4">
                            <div className="grid grid-cols-2 gap-4">
                                <div className="bg-[#262626] p-3 rounded-lg">
                                    <div className="flex items-center gap-2 text-gray-400 text-sm mb-1">
                                        <Ruler size={16} />
                                        Largura
                                    </div>
                                    <div className="text-white font-semibold">{packageData.width} cm</div>
                                </div>

                                <div className="bg-[#262626] p-3 rounded-lg">
                                    <div className="flex items-center gap-2 text-gray-400 text-sm mb-1">
                                        <Ruler size={16} />
                                        Altura
                                    </div>
                                    <div className="text-white font-semibold">{packageData.height} cm</div>
                                </div>
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                                <div className="bg-[#262626] p-3 rounded-lg">
                                    <div className="flex items-center gap-2 text-gray-400 text-sm mb-1">
                                        <Ruler size={16} />
                                        Profundidade
                                    </div>
                                    <div className="text-white font-semibold">{packageData.depth} cm</div>
                                </div>

                                <div className="bg-[#262626] p-3 rounded-lg">
                                    <div className="flex items-center gap-2 text-gray-400 text-sm mb-1">
                                        <Weight size={16} />
                                        Peso
                                    </div>
                                    <div className="text-white font-semibold">{packageData.weight} kg</div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Endereço de Destino */}
                    <div className="bg-[#404040] rounded-lg p-6">
                        <h2 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
                            <MapPin size={20} />
                            Endereço de Destino
                        </h2>

                        <div className="bg-[#262626] p-4 rounded-lg">
                            <div className="text-white leading-relaxed">
                                {packageData.formatted_address}
                            </div>
                        </div>
                    </div>

                    {/* Status e Unidade */}
                    <div className="bg-[#404040] rounded-lg p-6">
                        <h2 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
                            <Building size={20} />
                            Status da Entrega
                        </h2>

                        <div className="space-y-3">
                            <div className="bg-[#262626] p-3 rounded-lg">
                                <div className="text-gray-400 text-sm mb-1">Status Atual</div>
                                <div className="text-white font-semibold">{packageData.status}</div>
                            </div>

                            <div className="bg-[#262626] p-3 rounded-lg">
                                <div className="text-gray-400 text-sm mb-1">Unidade</div>
                                <div className="text-white font-semibold">{packageData.unit_title}</div>
                            </div>
                        </div>
                    </div>

                    {/* Passo Atual */}
                    <div className="bg-[#404040] rounded-lg p-6">
                        <h2 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
                            <FileText size={20} />
                            Passo Atual
                        </h2>

                        <div className="bg-[#262626] p-4 rounded-lg">
                            <div className="text-white leading-relaxed">
                                {packageData.step}
                            </div>
                        </div>
                    </div>

                    {/* Datas */}
                    <div className="bg-[#404040] rounded-lg p-6 lg:col-span-2">
                        <h2 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
                            <Calendar size={20} />
                            Informações de Data
                        </h2>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="bg-[#262626] p-3 rounded-lg">
                                <div className="text-gray-400 text-sm mb-1">Data de Criação</div>
                                <div className="text-white font-semibold">
                                    {new Date(packageData.created_at).toLocaleDateString('pt-BR', {
                                        year: 'numeric',
                                        month: 'long',
                                        day: 'numeric',
                                        hour: '2-digit',
                                        minute: '2-digit'
                                    })}
                                </div>
                            </div>

                            <div className="bg-[#262626] p-3 rounded-lg">
                                <div className="text-gray-400 text-sm mb-1">Última Atualização</div>
                                <div className="text-white font-semibold">
                                    {new Date(packageData.updated_at).toLocaleDateString('pt-BR', {
                                        year: 'numeric',
                                        month: 'long',
                                        day: 'numeric',
                                        hour: '2-digit',
                                        minute: '2-digit'
                                    })}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </AppLayout>
    );
}
