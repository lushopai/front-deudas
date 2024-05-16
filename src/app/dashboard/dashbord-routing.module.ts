import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DashboardComponent } from './dashboard.component';
import { AuthGuard } from '../security/guards/auth.guard';
import { RoleGuard } from '../security/guards/role.guard';

const routes: Routes = [
  {
    path: '',
    component: DashboardComponent,
    children: [


    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DashboardRoutingModule {}
