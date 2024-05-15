import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  // {
  //   path: '',
  //   component: DashboardComponent,
  //   children: [
  //     { path: '', component: InicioComponent },


  //   ],
  // },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DashbordRoutes {}
