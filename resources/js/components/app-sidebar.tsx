import { NavMain } from '@/components/nav-main';
import { NavUser } from '@/components/nav-user';
import { Sidebar, SidebarContent, SidebarFooter, SidebarHeader, SidebarMenu, SidebarMenuButton, SidebarMenuItem } from '@/components/ui/sidebar';
import { SharedData, type NavItem } from '@/types';
import { Link, usePage } from '@inertiajs/react';
import { LayoutGrid, Package, PackageCheck, PackageMinus, PackagePlus, Users } from 'lucide-react';
import AppLogo from './app-logo';

const adminNavItems: NavItem[] = [
    {
        title: 'Dashboard',
        href: '/dashboard',
        icon: LayoutGrid,
    },
    {
        title: 'Funcionarios',
        href: '/admin/employees',
        icon: Users
    },
    {
        title: 'Pacotes',
        href: '/admin/packages',
        icon: Package
    }
];

const operatorNavItems: NavItem[] = [
    {
        title: 'Pacotes',
        href: '/operator',
        icon: Package,
    },
    {
        title: 'Registar Nova Entrega',
        href: '/operator/packages/create',
        icon: PackagePlus
    },
    {
        title: 'Confirmar Pacotes',
        href: '/operator/packages/recieve',
        icon: PackageCheck
    },
    {
        title: 'Entregar Pacotes',
        href: '/operator/packages/give',
        icon: PackageMinus
    },
];

const deliverNavItems: NavItem[] = [
    {
        title: 'Meus Pacotes',
        href: '/deliver',
        icon: Package,
    },
    {
        title: 'Coletar Pacote',
        href: '/deliver/unit',
        icon: PackagePlus,
    },
];

export function AppSidebar() {
    const { auth } = usePage<SharedData>().props;
    const user = auth.user;
    let mainNavItems: NavItem[] = []
    if (user.role == 0)
        mainNavItems = adminNavItems
    if (user.role == 1)
        mainNavItems = operatorNavItems
    if (user.role == 2)
        mainNavItems = deliverNavItems

    return (
        <Sidebar collapsible="icon" variant="inset">
            <SidebarHeader>
                <SidebarMenu>
                    <SidebarMenuItem>
                        <SidebarMenuButton size="lg" asChild>
                            <Link href="/dashboard" prefetch>
                                <AppLogo />
                            </Link>
                        </SidebarMenuButton>
                    </SidebarMenuItem>
                </SidebarMenu>
            </SidebarHeader>

            <SidebarContent>
                <NavMain items={mainNavItems} />
            </SidebarContent>

            <SidebarFooter>
                <NavUser />
            </SidebarFooter>
        </Sidebar>
    );
}
