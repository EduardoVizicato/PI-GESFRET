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
import { TraveltestComponent } from './traveltest/traveltest.component';
import { CteStorageComponent } from './pages/cte-storage/cte-storage.component';
import { ViewTravelComponent } from './pages/view-travel/view-travel.component';

export enum Roles {
    ADM = 'ADM',
    FUNCIONARIO = 'FUNCIONARIO'
}

export const routes: Routes = [
    {
        path: '',
        component: LandingPageComponent,
        title: 'Gesfret',
    },
    {
        path: 'login',
        component: LoginComponent,
        title: 'Entrar',
    },
    {
        path: 'signUp-user',
        component: UserComponent,
        title: 'Criar Usuário',
    },
    {
        path: 'signUp-enterprise',
        component: EnterpriseComponent,
        title: 'Criar Empresa',
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
                title: 'Início',

            },
            {
                path: 'traveltest',
                component: TraveltestComponent,
                data: { title: 'Lista de Viagens',},
                title: 'Viagens',
            },
            {
                path: 'travels',
                component: TravelsComponent,
                canActivate: [authGuard],
                data: { breadcrumb: 'Travels', title: 'Lista de Viagens', roles: [Roles.ADM, Roles.FUNCIONARIO] },
                title: 'Viagens'
            },
            {
                path: 'viewTravel',
                component: ViewTravelComponent,
                canActivate: [authGuard],
                data: { breadcrumb: 'Travels', title: 'Dados da Viagem', roles: [Roles.ADM, Roles.FUNCIONARIO] },
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
                data: { title: 'Notas Fiscais', roles: [Roles.ADM, Roles.FUNCIONARIO] },
                title: 'Notas Fiscais'
            },
            {
                path: 'cte-storage',
                component: CteStorageComponent,
                canActivate: [authGuard],
                data: { title: 'Conhecimento de Transporte Eletrónico (CT-e)', roles: [Roles.ADM, Roles.FUNCIONARIO] },
                title: 'Conhecimento de Transporte Eletrónico (CT-e)'
            },
            {
                path: 'register/trucks',
                component: TrucksComponent,
                canActivate: [authGuard], data: { title: 'Cadastro de Caminhões', roles: [Roles.ADM] },
                title: 'Caminhões'
            },
            {
                path: 'register/loads',
                component: LoadsComponent,
                canActivate: [authGuard], data: { title: 'Cadastro de Cargas', roles: [Roles.ADM] },
                title: 'Cargas'
            },
            {
                path: 'register/clients',
                component: ClientsComponent,
                canActivate: [authGuard], data: { roles: [Roles.ADM] },
                title: 'Clientes'
            },
            {
                path: 'register/users',
                component: UsersComponent,
                canActivate: [authGuard], data: { title: 'Usuários', roles: [Roles.ADM] },
                title: 'Usuários'
            },
            {
                path: 'freight-calculation',
                component: FreightCalculationComponent,
                canActivate: [authGuard], data: { title: 'Calcular Frete', roles: [Roles.ADM, Roles.FUNCIONARIO] },
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
