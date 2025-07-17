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


export const routes: Routes = [
    {path: '', redirectTo: 'home', pathMatch: 'full'},
    {path: 'home', component: LandingPageComponent},
    {path: 'login', component: LoginComponent},
    {path: 'signUp-user', component: UserComponent},
    {path: 'signUp-enterprise', component: EnterpriseComponent},
    {path: 'dashboard', component: DashboardComponent, canActivate:[authGuard]},
    {path: 'travels', component: TravelsComponent,canActivate:[authGuard]},
    {path: 'nf-storage', component: NfStorageComponent, canActivate:[authGuard]},
    {path: 'register/trucks', component: TrucksComponent,canActivate:[authGuard]},
    {path: 'register/loads', component: LoadsComponent,canActivate:[authGuard]},
    {path: 'register/clients', component: ClientsComponent,canActivate:[authGuard]},
    {path: 'freight-calculation', component: FreightCalculationComponent,canActivate:[authGuard]},
];