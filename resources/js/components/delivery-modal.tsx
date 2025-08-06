import { useState, useEffect } from 'react';
import { useForm } from '@inertiajs/react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { MapPin, Package, Building } from 'lucide-react';

interface Unit {
    id: number;
    title: string;
    address?: {
        street: string;
        city: string;
        state: string;
    };
}

interface PackageData {
    id: number;
    code: string;
    formatted_address: string;
    status: string;
    step?: string;
}

interface DeliveryModalProps {
    isOpen: boolean;
    onClose: () => void;
    package: PackageData | null;
    units: Unit[];
}

export default function DeliveryModal({ isOpen, onClose, package: packageItem, units }: DeliveryModalProps) {
    const [deliveryType, setDeliveryType] = useState<'final' | 'unit'>('final');

    const { data, setData, post, processing, errors, reset } = useForm({
        delivery_type: 'final',
        unit_id: '',
        step: ''
    });

    // Sincronizar o form data com o estado local
    useEffect(() => {
        setData('delivery_type', deliveryType);
    }, [deliveryType]);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        if (!packageItem) return;

        // Validação antes do envio
        if (!data.step.trim()) {
            console.log('Erro: Campo step está vazio');
            return;
        }

        if (data.delivery_type === 'unit' && !data.unit_id) {
            console.log('Erro: Unit ID é obrigatório para entrega em unidade');
            return;
        }

        // Debug: verificar os dados antes de enviar
        console.log('Dados do formulário:', data);
        console.log('Delivery Type (state):', deliveryType);
        console.log('Package ID:', packageItem.id);

        post(`/deliver/deliver/${packageItem.id}`, {
            onSuccess: () => {
                console.log('Entrega realizada com sucesso!');
                reset();
                setDeliveryType('final');
                onClose();
            },
            onError: (errors) => {
                console.log('Erros de validação:', errors);
            }
        });
    };

    const handleClose = () => {
        console.log('Fechando modal, resetando estados');
        reset();
        setDeliveryType('final');
        setData('delivery_type', 'final');
        onClose();
    };

    const handleDeliveryTypeChange = (type: 'final' | 'unit') => {
        console.log('Alterando tipo de entrega para:', type);
        setDeliveryType(type);
        setData('delivery_type', type);
        if (type === 'final') {
            setData('unit_id', '');
        }
    };

    return (
        <Dialog open={isOpen} onOpenChange={handleClose}>
            <DialogContent className="sm:max-w-md bg-[#404040] text-white border-gray-600">
                <DialogHeader>
                    <DialogTitle className="flex items-center gap-2 text-white">
                        <Package className="w-5 h-5" />
                        Entregar Pacote #{packageItem?.code}
                    </DialogTitle>
                </DialogHeader>

                {packageItem && (
                    <form onSubmit={handleSubmit} className="space-y-4">
                        {/* Package Info */}
                        <div className="bg-[#262626] p-3 rounded-lg">
                            <div className="flex items-start gap-2 text-sm">
                                <MapPin className="w-4 h-4 mt-0.5 text-gray-400" />
                                <div>
                                    <p className="font-medium text-white">Destino:</p>
                                    <p className="text-gray-300">{packageItem.formatted_address}</p>
                                </div>
                            </div>
                        </div>

                        {/* Delivery Type */}
                        <div className="space-y-2">
                            <Label className="text-white">Tipo de Entrega</Label>
                            <div className="text-xs text-gray-400 mb-2">
                                Atual: {deliveryType} | Form: {data.delivery_type}
                            </div>
                            <div className="grid grid-cols-2 gap-2">
                                <Button
                                    type="button"
                                    variant={deliveryType === 'final' ? 'default' : 'outline'}
                                    onClick={() => handleDeliveryTypeChange('final')}
                                    className={`w-full ${deliveryType === 'final'
                                        ? 'bg-blue-600 hover:bg-blue-700 text-white'
                                        : 'bg-transparent border-gray-500 text-gray-300 hover:bg-[#262626] hover:text-white'
                                        }`}
                                >
                                    Destino Final
                                </Button>
                                <Button
                                    type="button"
                                    variant={deliveryType === 'unit' ? 'default' : 'outline'}
                                    onClick={() => handleDeliveryTypeChange('unit')}
                                    className={`w-full ${deliveryType === 'unit'
                                        ? 'bg-blue-600 hover:bg-blue-700 text-white'
                                        : 'bg-transparent border-gray-500 text-gray-300 hover:bg-[#262626] hover:text-white'
                                        }`}
                                >
                                    Para Unidade
                                </Button>
                            </div>
                            {errors.delivery_type && (
                                <p className="text-sm text-red-400">{errors.delivery_type}</p>
                            )}
                        </div>

                        {/* Unit Selection (only if delivery_type is 'unit') */}
                        {deliveryType === 'unit' && (
                            <div className="space-y-2">
                                <Label htmlFor="unit_id" className="text-white">Selecionar Unidade</Label>
                                <select
                                    value={data.unit_id}
                                    onChange={(e: React.ChangeEvent<HTMLSelectElement>) => setData('unit_id', e.target.value)}
                                    className="w-full px-3 py-2 bg-[#262626] text-white border border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                >
                                    <option value="">Escolha uma unidade</option>
                                    {units.map((unit) => (
                                        <option key={unit.id} value={unit.id.toString()}>
                                            {unit.title}
                                            {unit.address && ` - ${unit.address.city}, ${unit.address.state}`}
                                        </option>
                                    ))}
                                </select>
                                {errors.unit_id && (
                                    <p className="text-sm text-red-400">{errors.unit_id}</p>
                                )}
                            </div>
                        )}

                        {/* Step Description */}
                        <div className="space-y-2">
                            <Label htmlFor="step" className="text-white">Descreva passo atual *</Label>
                            <textarea
                                id="step"
                                value={data.step}
                                onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => setData('step', e.target.value)}
                                placeholder="Descreva o passo atual da entrega..."
                                className="w-full px-3 py-2 bg-[#262626] text-white border border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 resize-none placeholder-gray-400"
                                rows={3}
                            />
                            {errors.step && (
                                <p className="text-sm text-red-400">{errors.step}</p>
                            )}
                        </div>

                        {/* Actions */}
                        <div className="flex gap-2 pt-4">
                            <Button
                                type="button"
                                variant="outline"
                                onClick={handleClose}
                                className="flex-1 bg-transparent border-gray-500 text-gray-300 hover:bg-[#262626] hover:text-white"
                            >
                                Cancelar
                            </Button>
                            <Button
                                type="submit"
                                disabled={processing}
                                className="flex-1 bg-blue-600 hover:bg-blue-700 text-white"
                            >
                                {processing ? 'Processando...' : 'Confirmar Entrega'}
                            </Button>
                        </div>
                    </form>
                )}
            </DialogContent>
        </Dialog>
    );
}
