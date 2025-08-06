import PackageShow from '@/components/package-show';
import { type BreadcrumbItem } from '@/types';

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

    return <PackageShow breadcrumbs={breadcrumbs} packageData={packageData} />;
}
