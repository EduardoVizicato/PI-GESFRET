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



export const routes: Routes = [
    {
        path: '', 
        redirectTo: 'home', 
        pathMatch: 'full',
    },
    {
        path: 'home', 
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
                canActivate:[authGuard],
                data: {title: 'Dashboard'}, 
                title: 'Dashboard',
            },
            {
                path: 'travels', 
                component: TravelsComponent,
                canActivate:[authGuard], 
                data: { breadcrumb: 'Travels', title: 'Lista de Viagens' },
                title: 'Viagens'},
            {
                path: 'userInfo', 
                component: UserInfoComponent,
                canActivate:[authGuard], 
                data: { breadcrumb: 'User Info' }},
            {
                path: 'nf-storage', 
                component: NfStorageComponent, 
                canActivate:[authGuard], 
                data: { breadcrumb: 'NF Storage', title: 'Notas Fiscais' },
                title: 'Notas Fiscais'},
            {
                path: 'register/trucks', 
                component: TrucksComponent,
                canActivate:[authGuard], data: { breadcrumb: 'Cadastrar/Caminhoes', title: 'Cadastro de Caminhões' },
                title: 'Caminhões'},
            {
                path: 'register/loads', 
                component: LoadsComponent,
                canActivate:[authGuard], data: { breadcrumb: 'Loads', title: 'Cadastro de Cargas' },
                title: 'Cargas'},
            {
                path: 'register/clients', 
                component: ClientsComponent,
                canActivate:[authGuard], data: { breadcrumb: 'Clients' },
                title: 'Clientes'},
            {
                path: 'freight-calculation', 
                component: FreightCalculationComponent,
                canActivate:[authGuard], data: { breadcrumb: 'Freight Calculation', title: 'Calcular Frete' },
                title: 'Calcular Frete'},
        ]
    }
    
];