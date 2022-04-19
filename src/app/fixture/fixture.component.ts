import { CommonModule } from '@angular/common';
import {
  Component,
  Input,
  NgModule,
  OnChanges,
  SimpleChanges,
} from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatDialog } from '@angular/material/dialog';
import { MatDividerModule } from '@angular/material/divider';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatIconModule } from '@angular/material/icon';
import { MatTabsModule } from '@angular/material/tabs';
import {
  Cancha,
  Equipo,
  Fecha,
  Fixture,
  Jugador,
  Partido,
  PartidoFixture,
} from 'src/models/torneo';
import { DetallePartidoComponent } from '../detalle-partido/detalle-partido.component';
import {
  fieldSorter,
  getCanchaLocale,
  getClubImage,
  getClubName,
  getPartidosByIds,
} from '../torneo/torneo-utilities';
import { MatDialogModule } from '@angular/material/dialog';
import { MatRippleModule } from '@angular/material/core';

@Component({
  selector: 'app-fixture',
  templateUrl: './fixture.component.html',
  styleUrls: ['./fixture.component.scss'],
})
export class FixtureComponent implements OnChanges {
  constructor(public dialog: MatDialog) {}

  @Input()
  public jugadores: Jugador[] = [];

  @Input()
  public partidos: Partido[] = [];

  @Input()
  public equipos: Equipo[] = [];

  @Input()
  public canchas: Cancha[] = [];

  @Input()
  public fechas: Fecha[] = [];

  public fechaActualId: number = 0;

  public fixture: Fixture[] = [];

  ngOnChanges(changes: SimpleChanges): void {
    if (
      changes.jugadores ||
      changes.partidos ||
      changes.fechas ||
      changes.equipos ||
      changes.canchas
    ) {
      this.initialize(
        changes.partidos.currentValue,
        changes.equipos.currentValue,
        changes.canchas.currentValue,
        changes.fechas.currentValue
      );
    }
  }

  private initialize(
    partidos: Partido[],
    equipos: Equipo[],
    canchas: Cancha[],
    fechas: Fecha[]
  ) {
    let fecha: Fixture;
    fechas.forEach((fech) => {
      const nuevosPartidos: PartidoFixture[] = [];
      getPartidosByIds(fech.partidos, partidos).forEach((x) => {
        nuevosPartidos.push({
          ...x,
          imagenLocal: getClubImage(x.equipoLocalId, equipos) ?? '',
          imagenVisitante: getClubImage(x.equipoVisitanteId, equipos) ?? '',
          nombreLocal: getClubName(x.equipoLocalId, equipos) ?? '',
          nombreVisitante: getClubName(x.equipoVisitanteId, equipos) ?? '',
        });
      });
      fecha = {
        jugada: fech.jugada,
        id: parseInt(fech.id),
        canchaLocalidad: getCanchaLocale(fech.canchaId, canchas) ?? '',
        clubOrganizadorNombre:
          getClubName(fech.equipoOrganizadorId, equipos) ?? '',
        fecha: fech.fecha,
        partidos: nuevosPartidos,
      };
      this.fixture.push(fecha);
    });
    this.fixture.sort(fieldSorter(['id']));
    this.fechaActualId =
      Number(this.fixture.find((x) => x.jugada === false)?.id) - 1 ?? 1;
  }

  public getResultadoPartido(golesLocal: string[], golesVisitante: string[]) {
    return `${golesLocal.length} - ${golesVisitante.length}`;
  }

  public partidoSeleccionado(partido: PartidoFixture, fecha: Fixture) {
    if (partido.jugado) {
      this.dialog.open(DetallePartidoComponent, {
        data: {
          partido,
          jugadores: this.jugadores,
          fecha,
        },
      });
    }
  }
}
const matModules = [
  MatCardModule,
  MatIconModule,
  MatDividerModule,
  MatGridListModule,
  MatTabsModule,
  MatDialogModule,
  MatRippleModule,
];

@NgModule({
  declarations: [FixtureComponent],
  exports: [FixtureComponent],
  imports: [CommonModule, matModules],
})
export class FixtureModule {}
