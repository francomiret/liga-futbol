import { CommonModule } from '@angular/common';
import { Component, NgModule } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatDividerModule } from '@angular/material/divider';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatIconModule } from '@angular/material/icon';
import { equipos, fechas, canchas, partidos } from 'src/models/test-data';
import { Partido } from 'src/models/torneo';

@Component({
  selector: 'app-fixture',
  templateUrl: './fixture.component.html',
  styleUrls: ['./fixture.component.scss'],
})
export class FixtureComponent {
  public fixture = fechas;

  public getClubName(id: string) {
    return equipos.find((x) => x.id === id)?.nombre;
  }
  public getClubImage(id: string) {
    return equipos.find((x) => x.id === id)?.imagen;
  }
  public getCanchaLocale(id: string) {
    return canchas.find((x) => x.id === id)?.localidad;
  }
  public getResultadoPartido(golesLocal: string[], golesVisitante: string[]) {
    return `${golesLocal.length} - ${golesVisitante.length}`;
  }
  public getPartidos(partidosId: string[]) {
    const nuevosPartidos: Partido[] = [];
    partidosId.forEach((partidoId) => {
      const partido = partidos.find((x) => x.id === partidoId);
      if (partido) {
        nuevosPartidos.push(partido);
      }
    });
    return nuevosPartidos;
  }
}
const matModules = [
  MatCardModule,
  MatIconModule,
  MatDividerModule,
  MatGridListModule,
];

@NgModule({
  declarations: [FixtureComponent],
  exports: [FixtureComponent],
  imports: [CommonModule, matModules],
})
export class FixtureModule {}
