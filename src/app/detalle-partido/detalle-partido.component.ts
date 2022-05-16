import { CommonModule } from '@angular/common';
import { Component, Inject, NgModule } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatDividerModule } from '@angular/material/divider';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatIconModule } from '@angular/material/icon';
import { Fixture, Jugador, PartidoFixture } from 'src/models/torneo';
import { MatListModule } from '@angular/material/list';
import { getJugadorName } from '../torneo/torneo-utilities';

@Component({
  selector: 'app-detalle-partido',
  templateUrl: './detalle-partido.component.html',
  styleUrls: ['./detalle-partido.component.scss'],
})
export class DetallePartidoComponent {
  constructor(
    @Inject(MAT_DIALOG_DATA)
    public data: {
      partido: PartidoFixture;
      jugadores: Jugador[];
      fecha: Fixture;
    }
  ) {}

  public getResultadoPartido(golesLocal: string[], golesVisitante: string[]) {
    return `${golesLocal.length} - ${golesVisitante.length}`;
  }

  public getJugadorName(id: string, equipoId: string) {
    return getJugadorName(id, this.data.jugadores, equipoId);
  }
}
const matModules = [
  MatCardModule,
  MatIconModule,
  MatDividerModule,
  MatGridListModule,
  MatListModule,
];

@NgModule({
  declarations: [DetallePartidoComponent],
  exports: [DetallePartidoComponent],
  imports: [CommonModule, matModules],
})
export class DetallePartidoModule {}
