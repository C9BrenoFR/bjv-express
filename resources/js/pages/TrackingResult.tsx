import { Head, Link } from '@inertiajs/react';
import { PackageType } from '@/types/package.d';
import { ArrowLeft, Package, MapPin, Ruler, Weight, Calendar, Building, FileText, Clock, History } from 'lucide-react';

interface TrackingResultProps {
    packageData: PackageType;
    deliveryId: string;
}

export default function TrackingResult({ packageData, deliveryId }: TrackingResultProps) {
    return (
        <>
            <Head title={`Rastreamento - Pacote #${packageData.code}`} />
            <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
                {/* Header */}
                <header className="bg-white shadow-sm">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="flex justify-between items-center py-4">
                            <div className="flex items-center">
                                <img
                                    src="/BJexpress-Logo-Design.svg"
                                    alt="BJV Express Logo"
                                    className="h-8 w-auto mr-3"
                                />
                                <h1 className="text-xl font-semibold text-gray-900">BJV Express</h1>
                            </div>
                            <Link
                                href={route('tracking')}
                                className="text-blue-600 hover:text-blue-800 font-medium"
                            >
                                ← Nova busca
                            </Link>
                        </div>
                    </div>
                </header>

                {/* Main Content */}
                <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                    {/* Success Message */}
                    <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-6">
                        <div className="flex items-center">
                            <div className="flex-shrink-0">
                                <Package className="h-5 w-5 text-green-400" />
                            </div>
                            <div className="ml-3">
                                <p className="text-sm font-medium text-green-800">
                                    Pacote encontrado! ID do Delivery: {deliveryId}
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Package Information */}
                    <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
                        {/* Header */}
                        <div className="bg-gray-800 px-6 py-4">
                            <h1 className="text-xl font-semibold text-white flex items-center gap-2">
                                <Package size={24} />
                                Pacote #{packageData.code}
                            </h1>
                            <p className="text-gray-300 text-sm mt-1">
                                Informações detalhadas da entrega
                            </p>
                            <div className="mt-3">
                                <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-blue-100 text-blue-800">
                                    {packageData.status}
                                </span>
                            </div>
                        </div>

                        <div className="p-6">
                            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                                {/* Informações do Pacote */}
                                <div className="bg-gray-50 rounded-lg p-6">
                                    <h2 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
                                        <Package size={20} />
                                        Informações do Pacote
                                    </h2>

                                    <div className="space-y-4">
                                        <div className="grid grid-cols-2 gap-4">
                                            <div className="bg-white p-3 rounded-lg border">
                                                <div className="flex items-center gap-2 text-gray-600 text-sm mb-1">
                                                    <Ruler size={16} />
                                                    Largura
                                                </div>
                                                <div className="text-gray-900 font-semibold">{packageData.width} cm</div>
                                            </div>

                                            <div className="bg-white p-3 rounded-lg border">
                                                <div className="flex items-center gap-2 text-gray-600 text-sm mb-1">
                                                    <Ruler size={16} />
                                                    Altura
                                                </div>
                                                <div className="text-gray-900 font-semibold">{packageData.height} cm</div>
                                            </div>
                                        </div>

                                        <div className="grid grid-cols-2 gap-4">
                                            <div className="bg-white p-3 rounded-lg border">
                                                <div className="flex items-center gap-2 text-gray-600 text-sm mb-1">
                                                    <Ruler size={16} />
                                                    Profundidade
                                                </div>
                                                <div className="text-gray-900 font-semibold">{packageData.depth} cm</div>
                                            </div>

                                            <div className="bg-white p-3 rounded-lg border">
                                                <div className="flex items-center gap-2 text-gray-600 text-sm mb-1">
                                                    <Weight size={16} />
                                                    Peso
                                                </div>
                                                <div className="text-gray-900 font-semibold">{packageData.weight} kg</div>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                {/* Endereço de Destino */}
                                <div className="bg-gray-50 rounded-lg p-6">
                                    <h2 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
                                        <MapPin size={20} />
                                        Endereço de Destino
                                    </h2>

                                    <div className="bg-white p-4 rounded-lg border">
                                        <div className="text-gray-900 leading-relaxed">
                                            {packageData.formatted_address}
                                        </div>
                                    </div>
                                </div>

                                {/* Status e Unidade */}
                                <div className="bg-gray-50 rounded-lg p-6">
                                    <h2 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
                                        <Building size={20} />
                                        Status da Entrega
                                    </h2>

                                    <div className="space-y-3">
                                        <div className="bg-white p-3 rounded-lg border">
                                            <div className="text-gray-600 text-sm mb-1">Status Atual</div>
                                            <div className="text-gray-900 font-semibold">{packageData.status}</div>
                                        </div>

                                        <div className="bg-white p-3 rounded-lg border">
                                            <div className="text-gray-600 text-sm mb-1">Unidade</div>
                                            <div className="text-gray-900 font-semibold">{packageData.unit_title}</div>
                                        </div>
                                    </div>
                                </div>

                                {/* Histórico de Entregas */}
                                <div className="bg-gray-50 rounded-lg p-6">
                                    <h2 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
                                        <History size={20} />
                                        Histórico de Entregas
                                    </h2>

                                    <div className="space-y-3 max-h-64 overflow-y-auto">
                                        {packageData.histories && packageData.histories.length > 0 ? (
                                            packageData.histories.map((history, index) => (
                                                <div key={history.id} className="bg-white p-3 rounded-lg border border-l-4 border-l-blue-500">
                                                    <div className="flex items-start justify-between">
                                                        <div className="flex-1">
                                                            <p className="text-gray-900 font-medium">{history.step}</p>
                                                            <div className="flex items-center gap-2 mt-1">
                                                                <Clock size={14} className="text-gray-500" />
                                                                <span className="text-gray-500 text-sm">
                                                                    {new Date(history.created_at).toLocaleDateString('pt-BR', {
                                                                        day: '2-digit',
                                                                        month: '2-digit',
                                                                        year: 'numeric',
                                                                        hour: '2-digit',
                                                                        minute: '2-digit'
                                                                    })}
                                                                </span>
                                                            </div>
                                                        </div>
                                                        {index === 0 && (
                                                            <span className="bg-green-500 text-white text-xs px-2 py-1 rounded-full">
                                                                Atual
                                                            </span>
                                                        )}
                                                    </div>
                                                </div>
                                            ))
                                        ) : (
                                            <div className="bg-white p-4 rounded-lg border text-center">
                                                <p className="text-gray-500">Nenhum histórico disponível</p>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </div>

                            {/* Datas */}
                            <div className="bg-gray-50 rounded-lg p-6 mt-6">
                                <h2 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
                                    <Calendar size={20} />
                                    Informações de Data
                                </h2>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div className="bg-white p-3 rounded-lg border">
                                        <div className="text-gray-600 text-sm mb-1">Data de Criação</div>
                                        <div className="text-gray-900 font-semibold">
                                            {new Date(packageData.created_at).toLocaleDateString('pt-BR', {
                                                year: 'numeric',
                                                month: 'long',
                                                day: 'numeric',
                                                hour: '2-digit',
                                                minute: '2-digit'
                                            })}
                                        </div>
                                    </div>

                                    <div className="bg-white p-3 rounded-lg border">
                                        <div className="text-gray-600 text-sm mb-1">Última Atualização</div>
                                        <div className="text-gray-900 font-semibold">
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
                </main>
            </div>
        </>
    );
}
