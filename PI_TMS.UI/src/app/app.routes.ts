import { Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { TravelsComponent } from './pages/travels/travels.component';
import { TrucksComponent } from './pages/register/trucks/trucks.component';
import { LoadsComponent } from './pages/register/loads/loads.component';
import { ClientsComponent } from './pages/register/clients/clients.component';
import { authGuard } from './_guard/auth.guard';
import { UserComponent } from './sign-up/user/user.component';
import { EnterpriseComponent } from './sign-up/enterprise/enterprise.component';
import { FreightCalculationComponent } from './pages/freight-calculation/freight-calculation.component';
import { LandingPageComponent } from './landing-page/landing-page.component';
import { NfStorageComponent } from './pages/nf-storage/nf-storage.component';
import { MainLayoutComponent } from './layouts/main-layout/main-layout.component';
import { UserInfoComponent } from './pages/user-info/user-info.component';
import { Title } from 'chart.js';
import { UsersComponent } from './pages/register/users/users.component';
import { NoPageComponent } from './no-page/no-page.component';

export enum Roles {
    ADM = 'ADM',
    FUNCIONARIO = 'FUNCIONARIO'
}

export const routes: Routes = [
    {
        path: '',
        component: LandingPageComponent,
        title: 'GESFRET',
    },
    {
        path: 'login',
        component: LoginComponent,
        title: 'Entrar',
    },
    {
        path: 'signUp-user',
        component: UserComponent,
        title: 'Registre-se',
    },
    {
        path: 'signUp-enterprise',
        component: EnterpriseComponent,
        title: 'Registre-se',
    },
    {
        path: '',
        component: MainLayoutComponent,
        children: [
            {
                path: 'dashboard',
                component: DashboardComponent,
                canActivate: [authGuard],
                data: { title: 'Dashboard', roles: [Roles.ADM, Roles.FUNCIONARIO] },
                title: 'Dashboard',

            },
            {
                path: 'travels',
                component: TravelsComponent,
                canActivate: [authGuard],
                data: { breadcrumb: 'Travels', title: 'Lista de Viagens', roles: [Roles.ADM, Roles.FUNCIONARIO] },
                title: 'Viagens'
            },
            {
                path: 'userInfo',
                component: UserInfoComponent,
                canActivate: [authGuard],
                data: { breadcrumb: 'User Info', title: 'Meu Perfil', roles: [Roles.ADM, Roles.FUNCIONARIO] },
                title: 'Meu Perfil',
            },
            {
                path: 'nf-storage',
                component: NfStorageComponent,
                canActivate: [authGuard],
                data: { breadcrumb: 'NF Storage', title: 'Notas Fiscais', roles: [Roles.ADM, Roles.FUNCIONARIO] },
                title: 'Notas Fiscais'
            },
            {
                path: 'register/trucks',
                component: TrucksComponent,
                canActivate: [authGuard], data: { breadcrumb: 'Cadastrar/Caminhoes', title: 'Cadastro de Caminhões', roles: [Roles.ADM] },
                title: 'Caminhões'
            },
            {
                path: 'register/loads',
                component: LoadsComponent,
                canActivate: [authGuard], data: { breadcrumb: 'Loads', title: 'Cadastro de Cargas', roles: [Roles.ADM] },
                title: 'Cargas'
            },
            {
                path: 'register/clients',
                component: ClientsComponent,
                canActivate: [authGuard], data: { breadcrumb: 'Clients', roles: [Roles.ADM] },
                title: 'Clientes'
            },
            {
                path: 'register/users',
                component: UsersComponent,
                canActivate: [authGuard], data: { breadcrumb: 'Users', title: 'Usuários', roles: [Roles.ADM] },
                title: 'Usuários'
            },
            {
                path: 'freight-calculation',
                component: FreightCalculationComponent,
                canActivate: [authGuard], data: { breadcrumb: 'Freight Calculation', title: 'Calcular Frete', roles: [Roles.ADM, Roles.FUNCIONARIO] },
                title: 'Calcular Frete'
            },
        ]
    },
    // dxa smp c ultima
    {
        path: '**',
        component: NoPageComponent,
        title: 'Página Não Encontrada',
    }

];
