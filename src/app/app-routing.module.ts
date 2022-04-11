import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ClubesComponent } from './club/club.component';
import { TorneoComponent } from './torneo/torneo.component';

const routes: Routes = [
  { path: '', redirectTo: 'torneo', pathMatch: 'full' },

  { path: 'torneo', component: TorneoComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
