import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ClubesComponent } from './club/club.component';

const routes: Routes = [
  { path: 'clubes', component: ClubesComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
