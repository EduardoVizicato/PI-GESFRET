import { Routes } from '@angular/router';
import { LoginComponent } from './auth/login/login.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { TravelsComponent } from './pages/travels/travels.component';
import { TrucksComponent } from './pages/register/trucks/trucks.component';
import { LoadsComponent } from './pages/register/loads/loads.component';
import { ClientsComponent } from './pages/register/clients/clients.component';
import { authGuardGuard } from './_guard/auth-guard.guard';

export const routes: Routes = [
    {path: '', redirectTo: 'login', pathMatch: 'full'},
    {path: 'login', component: LoginComponent},
    {path: 'dashboard', component: DashboardComponent, canActivate: [authGuardGuard]},
    {path: 'travels', component: TravelsComponent},
    {path: 'register/trucks', component: TrucksComponent},
    {path: 'register/loads', component: LoadsComponent},
    {path: 'register/clients', component: ClientsComponent},
];
