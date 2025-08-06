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

export default function RecieveModal({ isOpen, onClose, package: packageItem }: CollectModalProps) {
    const { data, setData, post, processing, errors, reset } = useForm({
        step: ''
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        if (!packageItem) return;

        post(`/operator/packages/confirm/${packageItem.id}`, {
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
                        Receber Pacote #{packageItem?.code}
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

                        <div className="bg-blue-950 border border-blue-700 rounded-lg p-3">
                            <div className="flex items-start gap-2">
                                <Package className="w-4 h-4 mt-0.5 text-blue-400" />
                                <div className="text-sm">
                                    <p className="text-blue-300 font-medium mb-1">Importante:</p>
                                    <p className="text-blue-200">
                                        Só confirme o recebiemnto se o pacote ja estiver em posse desta agência!
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
