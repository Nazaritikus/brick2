import {NgModule} from '@angular/core';
import { RouterModule} from '@angular/router';
import {CommonModule} from '@angular/common';
import { AdminLayoutComponent } from './shared/components/admin-layout/admin-layout.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { CreatePageComponent } from './create-page/create-page.component';
import { EditPageComponent } from './edit-page/edit-page.component';
import { LoginPageComponent } from './login-page/login-page.component';
import {ReactiveFormsModule} from '@angular/forms';
import {SharedModule} from '../shared/shared.module';
import {AuthGuard} from './shared/services/auth.guard';
import { AlertComponent } from './shared/components/alert/alert.component';
import {AlertService} from './shared/services/alert.service';

@NgModule({
  declarations: [
    AdminLayoutComponent,
    DashboardComponent,
    CreatePageComponent,
    EditPageComponent,
    LoginPageComponent,
    AlertComponent,
    AlertComponent
  ],
    imports: [
        CommonModule,
        SharedModule,
        RouterModule.forChild([
            {
                path: '', component: AdminLayoutComponent, children: [
                    {path: '', redirectTo: '/admin/login', pathMatch: 'full'},
                    {path: 'login', component: LoginPageComponent},
                    {path: 'dashboard', component: DashboardComponent, canActivate: [AuthGuard]},
                    {path: 'create', component: CreatePageComponent, canActivate: [AuthGuard]},
                    {path: ':region/:id/edit', component: EditPageComponent, canActivate: [AuthGuard]}
                ]
            }
        ]),
        ReactiveFormsModule
    ],
  exports: [RouterModule],
  providers: [
    AuthGuard,
    AlertService
  ]
})
export class AdminModule {
}
