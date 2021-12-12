import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TorneoComponent } from './torneo.component';
import { MatTableModule } from '@angular/material/table';
import { MatDividerModule } from '@angular/material/divider';
import { MatIconModule } from '@angular/material/icon';
import { PosicionesModule } from '../posiciones/posiciones.module';
import { PartidosModule } from '../partidos/partidos.module';

const matModules = [MatTableModule, MatDividerModule, MatIconModule];
@NgModule({
  declarations: [TorneoComponent],
  exports: [TorneoComponent],
  imports: [CommonModule, PosicionesModule, PartidosModule, matModules],
})
export class TorneoModule {}
