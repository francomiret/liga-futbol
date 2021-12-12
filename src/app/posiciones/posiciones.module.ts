import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PosicionesComponent } from './posiciones.component';

import { MatTableModule } from '@angular/material/table';
import { MatDividerModule } from '@angular/material/divider';
import { MatIconModule } from '@angular/material/icon';

const matModules = [MatTableModule, MatDividerModule, MatIconModule];

@NgModule({
  declarations: [PosicionesComponent],
  exports: [PosicionesComponent],
  imports: [CommonModule, matModules],
})
export class PosicionesModule {}
