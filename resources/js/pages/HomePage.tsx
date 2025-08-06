import { Head, Link } from '@inertiajs/react';

export default function HomePage() {
    return (
        <>
            <Head title="BJV Express - Bem-vindos" />
            <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-6">
                <div className="max-w-md w-full">
                    <div className="bg-white rounded-2xl shadow-xl p-8 text-center">
                        {/* Logo */}
                        <div className="mb-8">
                            <img
                                src="/BJexpress-Logo-Design.svg"
                                alt="BJV Express Logo"
                                className="mx-auto h-16 w-auto"
                            />
                        </div>

                        {/* Welcome Message */}
                        <h1 className="text-3xl font-bold text-gray-900 mb-4">
                            Bem-vindos ao BJV Express
                        </h1>
                        <p className="text-gray-600 mb-8">
                            Seu sistema de gestão de entregas rápido e confiável
                        </p>

                        {/* Buttons */}
                        <div className="space-y-4">
                            <Link
                                href={route('tracking')}
                                className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-lg transition duration-200 ease-in-out transform hover:scale-105 shadow-lg block"
                            >
                                Sou um cliente
                            </Link>

                            <Link
                                href={route('login')}
                                className="w-full bg-gray-600 hover:bg-gray-700 text-white font-semibold py-3 px-6 rounded-lg transition duration-200 ease-in-out transform hover:scale-105 shadow-lg block"
                            >
                                Sou um funcionário
                            </Link>
                        </div>

                        {/* Footer */}
                        <div className="mt-8 pt-6 border-t border-gray-200">
                            <p className="text-sm text-gray-500">
                                Rapidez e segurança em cada entrega
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
