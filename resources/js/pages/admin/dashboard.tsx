import { PlaceholderPattern } from '@/components/ui/placeholder-pattern';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head } from '@inertiajs/react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Cell, Pie, PieChart, ResponsiveContainer, Tooltip, BarChart, Bar, XAxis, YAxis, CartesianGrid } from 'recharts';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Dashboard',
        href: '/dashboard',
    },
];

type OperatorsInfo = {
    registered: number
    actives: number
}

type DeliversInfo = {
    registered: number
    actives: number
}

type PackagesInfo = {
    new: number
    value: number
}

type UnitData = {
    month: string
    packages: number
}

type StateData = {
    name: string
    units: number
}

interface PageProps {
    operators_info: OperatorsInfo
    delivers_info: DeliversInfo
    packages_info: PackagesInfo
    units_data: UnitData[]
    states_data: StateData[]

}

export default function Dashboard({ operators_info, delivers_info, packages_info, units_data, states_data }: PageProps) {
    // Dados para os gráficos de pizza dos operadores
    const operatorsData = [
        { name: 'Ativos', value: operators_info.actives, color: '#8B5CF6' },
        { name: 'Inativos', value: operators_info.registered - operators_info.actives, color: '#F97316' }
    ];

    // Dados para os gráficos de pizza dos motoristas
    const deliversData = [
        { name: 'Ativos', value: delivers_info.actives, color: '#8B5CF6' },
        { name: 'Inativos', value: delivers_info.registered - delivers_info.actives, color: '#F97316' }
    ];

    const formatCurrency = (value: number) => {
        return new Intl.NumberFormat('pt-BR', {
            style: 'currency',
            currency: 'BRL'
        }).format(value);
    };

    const formatNumber = (value: number) => {
        return new Intl.NumberFormat('pt-BR').format(value);
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Dashboard" />
            <div className="flex h-full flex-1 flex-col gap-6 rounded-xl p-6 overflow-x-auto bg-background">
                {/* Cards de estatísticas no topo */}
                <div className="grid gap-6 md:grid-cols-3">
                    <Card className="bg-card border-border">
                        <CardHeader className="pb-3">
                            <CardTitle className="text-lg font-semibold text-foreground">
                                Operadores (Últimos 30 dias)
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="flex justify-between items-center">
                                <div>
                                    <div className="text-3xl font-bold text-foreground">{formatNumber(operators_info.registered)}</div>
                                    <div className="text-sm text-muted-foreground">Operadores cadastrados</div>
                                </div>
                                <div>
                                    <div className="text-3xl font-bold text-foreground">{formatNumber(operators_info.actives)}</div>
                                    <div className="text-sm text-muted-foreground">Operadores ativos</div>
                                </div>
                            </div>
                        </CardContent>
                    </Card>

                    <Card className="bg-card border-border">
                        <CardHeader className="pb-3">
                            <CardTitle className="text-lg font-semibold text-foreground">
                                Motoristas (Últimos 30 dias)
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="flex justify-between items-center">
                                <div>
                                    <div className="text-3xl font-bold text-foreground">{formatNumber(delivers_info.registered)}</div>
                                    <div className="text-sm text-muted-foreground">Motoristas cadastrados</div>
                                </div>
                                <div>
                                    <div className="text-3xl font-bold text-foreground">{formatNumber(delivers_info.actives)}</div>
                                    <div className="text-sm text-muted-foreground">Motoristas ativos</div>
                                </div>
                            </div>
                        </CardContent>
                    </Card>

                    <Card className="bg-card border-border">
                        <CardHeader className="pb-3">
                            <CardTitle className="text-lg font-semibold text-foreground">
                                Pacotes (Últimos 30 dias)
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="flex justify-between items-center">
                                <div>
                                    <div className="text-3xl font-bold text-foreground">{formatNumber(packages_info.new)}</div>
                                    <div className="text-sm text-muted-foreground">Novos Pacotes</div>
                                </div>
                                <div>
                                    <div className="text-3xl font-bold text-foreground">{formatCurrency(packages_info.value)}</div>
                                    <div className="text-sm text-muted-foreground">De valor bruto arrecadado</div>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                </div>

                {/* Seção dos gráficos */}
                <div className="grid gap-6 lg:grid-cols-3">
                    {/* Gráfico de Unidades */}
                    <Card className="bg-card border-border">
                        <CardHeader>
                            <CardTitle className="text-lg font-semibold text-foreground">Unidades</CardTitle>
                            <div className="space-y-2">
                                <div>
                                    <div className="text-2xl font-bold text-foreground">60</div>
                                    <div className="text-sm text-muted-foreground">Unidades Cadastradas</div>
                                </div>
                                <div>
                                    <div className="text-2xl font-bold text-foreground">2.500</div>
                                    <div className="text-sm text-muted-foreground">Pacotes por unidade</div>
                                </div>
                            </div>
                        </CardHeader>
                        <CardContent>
                            <ResponsiveContainer width="100%" height={200}>
                                <BarChart data={units_data}>
                                    <CartesianGrid strokeDasharray="3 3" />
                                    <XAxis dataKey="month" />
                                    <YAxis />
                                    <Tooltip />
                                    <Bar dataKey="packages" fill="#8B5CF6" />
                                </BarChart>
                            </ResponsiveContainer>
                        </CardContent>
                    </Card>

                    {/* Gráfico de Operadores */}
                    <Card className="bg-card border-border">
                        <CardHeader>
                            <CardTitle className="text-lg font-semibold text-foreground">Operadores por unidade</CardTitle>
                            <div className="text-center">
                                <div className="text-2xl font-bold text-foreground">13,3</div>
                                <div className="text-sm text-muted-foreground">Operadores por unidade</div>
                            </div>
                        </CardHeader>
                        <CardContent className="flex justify-center">
                            <ResponsiveContainer width="100%" height={200}>
                                <PieChart>
                                    <Pie
                                        data={operatorsData}
                                        cx="50%"
                                        cy="50%"
                                        innerRadius={40}
                                        outerRadius={80}
                                        paddingAngle={5}
                                        dataKey="value"
                                    >
                                        {operatorsData.map((entry, index) => (
                                            <Cell key={`cell-${index}`} fill={entry.color} />
                                        ))}
                                    </Pie>
                                    <Tooltip />
                                </PieChart>
                            </ResponsiveContainer>
                        </CardContent>
                    </Card>

                    {/* Gráfico de Motoristas */}
                    <Card className="bg-card border-border">
                        <CardHeader>
                            <CardTitle className="text-lg font-semibold text-foreground">Motoristas por unidade</CardTitle>
                            <div className="text-center">
                                <div className="text-2xl font-bold text-foreground">8,7</div>
                                <div className="text-sm text-muted-foreground">Motoristas por unidade</div>
                            </div>
                        </CardHeader>
                        <CardContent className="flex justify-center">
                            <ResponsiveContainer width="100%" height={200}>
                                <PieChart>
                                    <Pie
                                        data={deliversData}
                                        cx="50%"
                                        cy="50%"
                                        innerRadius={40}
                                        outerRadius={80}
                                        paddingAngle={5}
                                        dataKey="value"
                                    >
                                        {deliversData.map((entry, index) => (
                                            <Cell key={`cell-${index}`} fill={entry.color} />
                                        ))}
                                    </Pie>
                                    <Tooltip />
                                </PieChart>
                            </ResponsiveContainer>
                        </CardContent>
                    </Card>
                </div>

                {/* Seção do mapa (placeholder) */}
                <Card className="bg-card border-border">
                    <CardHeader>
                        <CardTitle className="text-lg font-semibold text-foreground">Estados com maior número de unidades</CardTitle>
                        <div className="space-y-2">
                            {states_data.map(data => (
                                <div className="flex justify-between" key={data.name}>
                                    <span className="text-2xl font-bold text-foreground">{data.units}</span>
                                    <span className="text-sm text-muted-foreground">{data.name}</span>
                                </div>
                            ))}
                        </div>
                    </CardHeader>
                    <CardContent>
                        <div className="relative min-h-[300px] flex items-center justify-center bg-muted rounded-lg">
                            <div className="text-center text-muted-foreground">
                                <p className="text-lg">Mapa do Brasil</p>
                                <p className="text-sm">Aqui seria exibido o mapa interativo</p>
                            </div>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </AppLayout>
    );
}
