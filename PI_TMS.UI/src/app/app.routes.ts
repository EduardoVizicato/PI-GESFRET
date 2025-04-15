import { NgModule } from '@angular/core';
import { Routes, RouterModule  } from '@angular/router';
import { LoginComponent } from './auth/login/login.component';

export const routes: Routes = [
    {path: 'login', component: LoginComponent},
];
NgModule({
    imports: [
      RouterModule.forRoot(routes, { useHash: true }),
    ]
})
