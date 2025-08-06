import { Head, Link, useForm, usePage } from '@inertiajs/react';
import { FormEventHandler } from 'react';

export default function TrackingPage() {
    const { flash } = usePage().props as any;
    const { data, setData, post, processing, errors, reset } = useForm({
        delivery_id: '',
    });

    const handleSubmit: FormEventHandler = (e) => {
        e.preventDefault();
        post(route('tracking.show'));
    };

    return (
        <>
            <Head title="Rastreamento - BJV Express" />
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
                                href={route('home')}
                                className="text-blue-600 hover:text-blue-800 font-medium"
                            >
                                ← Voltar ao início
                            </Link>
                        </div>
                    </div>
                </header>

                {/* Main Content */}
                <main className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                    <div className="bg-white rounded-2xl shadow-xl p-8">
                        <div className="text-center mb-8">
                            <h2 className="text-3xl font-bold text-gray-900 mb-4">
                                Rastreamento de Pacotes
                            </h2>
                            <p className="text-gray-600">
                                Digite o código de rastreamento para acompanhar sua entrega
                            </p>
                        </div>

                        {/* Error Message */}
                        {flash?.error && (
                            <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6">
                                <div className="flex items-center">
                                    <div className="flex-shrink-0">
                                        <svg className="h-5 w-5 text-red-400" viewBox="0 0 20 20" fill="currentColor">
                                            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                                        </svg>
                                    </div>
                                    <div className="ml-3">
                                        <p className="text-sm font-medium text-red-800">
                                            {flash.error}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        )}

                        {/* Tracking Form */}
                        <form onSubmit={handleSubmit} className="mb-8">
                            <div className="flex gap-4">
                                <input
                                    type="text"
                                    value={data.delivery_id}
                                    onChange={(e) => setData('delivery_id', e.target.value)}
                                    placeholder="Ex: 01987d7e-58b5-7300-87e6-3c49fa987d86"
                                    className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                    required
                                />
                                <button
                                    type="submit"
                                    disabled={processing}
                                    className="bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white font-semibold px-6 py-3 rounded-lg transition duration-200"
                                >
                                    {processing ? 'Buscando...' : 'Rastrear'}
                                </button>
                            </div>
                            {errors.delivery_id && (
                                <p className="mt-2 text-red-600 text-sm">{errors.delivery_id}</p>
                            )}
                        </form>

                        {/* Information */}
                        <div className="mt-8 pt-8 border-t border-gray-200">
                            <h4 className="font-semibold text-gray-900 mb-4">Como funciona:</h4>
                            <ul className="space-y-2 text-gray-600">
                                <li>• Digite o ID do delivery (UUID) fornecido</li>
                                <li>• Clique em "Rastrear" para buscar informações</li>
                                <li>• Acompanhe o status da sua entrega em tempo real</li>
                            </ul>
                        </div>
                    </div>
                </main>
            </div>
        </>
    );
}
