import { Input } from '@/components/ui/input';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head, useForm } from '@inertiajs/react';
import { FormEventHandler } from 'react';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Pacotes',
        href: '/admin/packages',
    },
    {
        title: 'Criar',
        href: '/admin/packages/create',
    },
];

export default function CreatePackagePage() {
    const { data, setData, post, processing, errors } = useForm({
        width: '',
        height: '',
        depth: '',
        weight: '',
        street: '',
        number: '',
        city: '',
        state: '',
        zip_code: '',
        complement: '',
    });

    const submit: FormEventHandler = (e) => {
        e.preventDefault();
        post(route('admin.packages.store'));
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Criar Pacote" />
            <div className="flex h-full flex-1 flex-col gap-4 rounded-xl p-4">
                <div className="bg-[#404040] shadow sm:rounded-lg">
                    <div className="px-4 py-5 sm:p-6">
                        <h3 className="text-lg font-medium leading-6 text-white mb-4">
                            Criar Novo Pacote
                        </h3>

                        <form onSubmit={submit} className="space-y-8">
                            {/* Informações do Pacote */}
                            <div>
                                <h4 className="text-md font-medium text-white mb-4">
                                    Dimensões do Pacote
                                </h4>
                                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                                    <div>
                                        <label htmlFor="width" className="block text-sm font-medium text-gray-300">
                                            Largura (cm)
                                        </label>
                                        <Input
                                            id="width"
                                            name="width"
                                            type="number"
                                            step="0.01"
                                            min="0"
                                            value={data.width}
                                            className="mt-1 bg-[#262626] border-gray-600 text-white"
                                            onChange={(e) => setData('width', e.target.value)}
                                            required
                                        />
                                        {errors.width && <div className="text-red-400 text-sm mt-1">{errors.width}</div>}
                                    </div>

                                    <div>
                                        <label htmlFor="height" className="block text-sm font-medium text-gray-300">
                                            Altura (cm)
                                        </label>
                                        <Input
                                            id="height"
                                            name="height"
                                            type="number"
                                            step="0.01"
                                            min="0"
                                            value={data.height}
                                            className="mt-1 bg-[#262626] border-gray-600 text-white"
                                            onChange={(e) => setData('height', e.target.value)}
                                            required
                                        />
                                        {errors.height && <div className="text-red-400 text-sm mt-1">{errors.height}</div>}
                                    </div>

                                    <div>
                                        <label htmlFor="depth" className="block text-sm font-medium text-gray-300">
                                            Profundidade (cm)
                                        </label>
                                        <Input
                                            id="depth"
                                            name="depth"
                                            type="number"
                                            step="0.01"
                                            min="0"
                                            value={data.depth}
                                            className="mt-1 bg-[#262626] border-gray-600 text-white"
                                            onChange={(e) => setData('depth', e.target.value)}
                                            required
                                        />
                                        {errors.depth && <div className="text-red-400 text-sm mt-1">{errors.depth}</div>}
                                    </div>

                                    <div>
                                        <label htmlFor="weight" className="block text-sm font-medium text-gray-300">
                                            Peso (kg)
                                        </label>
                                        <Input
                                            id="weight"
                                            name="weight"
                                            type="number"
                                            step="0.01"
                                            min="0"
                                            value={data.weight}
                                            className="mt-1 bg-[#262626] border-gray-600 text-white"
                                            onChange={(e) => setData('weight', e.target.value)}
                                            required
                                        />
                                        {errors.weight && <div className="text-red-400 text-sm mt-1">{errors.weight}</div>}
                                    </div>
                                </div>
                            </div>

                            {/* Endereço de Destino */}
                            <div>
                                <h4 className="text-md font-medium text-white mb-4">
                                    Endereço de Destino
                                </h4>
                                <div className="space-y-4">
                                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                        <div className="md:col-span-2">
                                            <label htmlFor="street" className="block text-sm font-medium text-gray-300">
                                                Rua
                                            </label>
                                            <Input
                                                id="street"
                                                name="street"
                                                value={data.street}
                                                className="mt-1 bg-[#262626] border-gray-600 text-white"
                                                onChange={(e) => setData('street', e.target.value)}
                                                required
                                            />
                                            {errors.street && <div className="text-red-400 text-sm mt-1">{errors.street}</div>}
                                        </div>

                                        <div>
                                            <label htmlFor="number" className="block text-sm font-medium text-gray-300">
                                                Número
                                            </label>
                                            <Input
                                                id="number"
                                                name="number"
                                                value={data.number}
                                                className="mt-1 bg-[#262626] border-gray-600 text-white"
                                                onChange={(e) => setData('number', e.target.value)}
                                                required
                                            />
                                            {errors.number && <div className="text-red-400 text-sm mt-1">{errors.number}</div>}
                                        </div>
                                    </div>

                                    <div>
                                        <label htmlFor="complement" className="block text-sm font-medium text-gray-300">
                                            Complemento (opcional)
                                        </label>
                                        <Input
                                            id="complement"
                                            name="complement"
                                            value={data.complement}
                                            className="mt-1 bg-[#262626] border-gray-600 text-white"
                                            onChange={(e) => setData('complement', e.target.value)}
                                        />
                                        {errors.complement && <div className="text-red-400 text-sm mt-1">{errors.complement}</div>}
                                    </div>

                                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                        <div>
                                            <label htmlFor="city" className="block text-sm font-medium text-gray-300">
                                                Cidade
                                            </label>
                                            <Input
                                                id="city"
                                                name="city"
                                                value={data.city}
                                                className="mt-1 bg-[#262626] border-gray-600 text-white"
                                                onChange={(e) => setData('city', e.target.value)}
                                                required
                                            />
                                            {errors.city && <div className="text-red-400 text-sm mt-1">{errors.city}</div>}
                                        </div>

                                        <div>
                                            <label htmlFor="state" className="block text-sm font-medium text-gray-300">
                                                Estado (UF)
                                            </label>
                                            <Input
                                                id="state"
                                                name="state"
                                                value={data.state}
                                                className="mt-1 bg-[#262626] border-gray-600 text-white"
                                                maxLength={2}
                                                onChange={(e) => setData('state', e.target.value.toUpperCase())}
                                                required
                                            />
                                            {errors.state && <div className="text-red-400 text-sm mt-1">{errors.state}</div>}
                                        </div>

                                        <div>
                                            <label htmlFor="zip_code" className="block text-sm font-medium text-gray-300">
                                                CEP
                                            </label>
                                            <Input
                                                id="zip_code"
                                                name="zip_code"
                                                value={data.zip_code}
                                                className="mt-1 bg-[#262626] border-gray-600 text-white"
                                                onChange={(e) => setData('zip_code', e.target.value)}
                                                required
                                            />
                                            {errors.zip_code && <div className="text-red-400 text-sm mt-1">{errors.zip_code}</div>}
                                        </div>
                                    </div>
                                </div>
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
                                    {processing ? 'Criando...' : 'Criar Pacote'}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </AppLayout>
    );
}
