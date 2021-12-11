import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TorneoComponent } from './torneo.component';

@NgModule({
  declarations: [TorneoComponent],
  exports: [TorneoComponent],
  imports: [CommonModule],
})
export class TorneoModule {}
