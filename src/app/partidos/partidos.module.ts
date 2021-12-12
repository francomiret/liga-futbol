import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PartidosComponent } from './partidos.component';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';

const matModules = [MatIconModule, MatCardModule];

@NgModule({
  declarations: [PartidosComponent],
  exports: [PartidosComponent],
  imports: [CommonModule, matModules],
})
export class PartidosModule {}
