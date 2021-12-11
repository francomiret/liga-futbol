import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ClubesComponent } from './clubes/clubes.component';
import { TorneoComponent } from './torneo/torneo.component';

const routes: Routes = [
  { path: '', component: TorneoComponent },
  { path: 'clubes', component: ClubesComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
