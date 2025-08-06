import PackageShow from '@/components/package-show';
import { type BreadcrumbItem } from '@/types';
import { PackageType } from '@/types/package';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Pacotes',
        href: '/admin/packages',
    },
    {
        title: 'Visualizar',
        href: '#',
    },
];

interface PageProps {
    package: PackageType;
}

export default function ShowPackagePage({ package: pkg }: PageProps) {

    return <PackageShow breadcrumbs={breadcrumbs} packageData={pkg} />;
}
