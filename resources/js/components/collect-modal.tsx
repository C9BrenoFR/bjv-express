import { useState } from 'react';
import { useForm } from '@inertiajs/react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { MapPin, Package, CheckCircle } from 'lucide-react';

interface PackageData {
    id: number;
    code: string;
    formatted_address: string;
    status: string;
}

interface CollectModalProps {
    isOpen: boolean;
    onClose: () => void;
    package: PackageData | null;
}

export default function CollectModal({ isOpen, onClose, package: packageItem }: CollectModalProps) {
    const { data, setData, post, processing, errors, reset } = useForm({
        step: ''
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        if (!packageItem) return;

        post(`/deliver/collect/${packageItem.id}`, {
            onSuccess: () => {
                reset();
                onClose();
            }
        });
    };

    const handleClose = () => {
        reset();
        onClose();
    };

    return (
        <Dialog open={isOpen} onOpenChange={handleClose}>
            <DialogContent className="sm:max-w-md bg-[#404040] text-white border-gray-600">
                <DialogHeader>
                    <DialogTitle className="flex items-center gap-2 text-white">
                        <CheckCircle className="w-5 h-5 text-green-400" />
                        Coletar Pacote #{packageItem?.code}
                    </DialogTitle>
                </DialogHeader>

                {packageItem && (
                    <form onSubmit={handleSubmit} className="space-y-4">
                        {/* Package Info */}
                        <div className="bg-[#262626] p-3 rounded-lg">
                            <div className="flex items-start gap-2 text-sm">
                                <MapPin className="w-4 h-4 mt-0.5 text-gray-400" />
                                <div>
                                    <p className="font-medium text-white">Destino do Pacote:</p>
                                    <p className="text-gray-300">{packageItem.formatted_address}</p>
                                </div>
                            </div>
                        </div>

                        {/* Collection Step */}
                        <div className="space-y-2">
                            <Label htmlFor="step" className="text-white">Para onde você está indo com este pacote? *</Label>
                            <textarea
                                id="step"
                                value={data.step}
                                onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => setData('step', e.target.value)}
                                placeholder="Ex: Saindo da unidade Central em direção ao endereço de entrega..."
                                className="w-full px-3 py-2 bg-[#262626] text-white border border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500 resize-none placeholder-gray-400"
                                rows={3}
                            />
                            {errors.step && (
                                <p className="text-sm text-red-400">{errors.step}</p>
                            )}
                        </div>

                        <div className="bg-blue-950 border border-blue-700 rounded-lg p-3">
                            <div className="flex items-start gap-2">
                                <Package className="w-4 h-4 mt-0.5 text-blue-400" />
                                <div className="text-sm">
                                    <p className="text-blue-300 font-medium mb-1">Importante:</p>
                                    <p className="text-blue-200">
                                        Descreva claramente seu próximo destino. Esta informação será
                                        registrada para rastreamento da entrega.
                                    </p>
                                </div>
                            </div>
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
                                className="flex-1 bg-green-600 hover:bg-green-700 text-white"
                            >
                                {processing ? 'Coletando...' : 'Confirmar Coleta'}
                            </Button>
                        </div>
                    </form>
                )}
            </DialogContent>
        </Dialog>
    );
}
