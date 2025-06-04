import { Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { TravelsComponent } from './pages/travels/travels.component';
import { TrucksComponent } from './pages/register/trucks/trucks.component';
import { LoadsComponent } from './pages/register/loads/loads.component';
import { ClientsComponent } from './pages/register/clients/clients.component';
import { authGuard } from './_guard/auth.guard';


export const routes: Routes = [
    {path: '', redirectTo: 'login', pathMatch: 'full'},
    {path: 'login', component: LoginComponent},
    {path: 'dashboard', component: DashboardComponent, canActivate:[authGuard]},
    {path: 'travels', component: TravelsComponent,canActivate:[authGuard]},
    {path: 'register/trucks', component: TrucksComponent,canActivate:[authGuard]},
    {path: 'register/loads', component: LoadsComponent,canActivate:[authGuard]},
    {path: 'register/clients', component: ClientsComponent,canActivate:[authGuard]},
];
