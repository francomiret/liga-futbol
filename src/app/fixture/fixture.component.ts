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
  PartidoFixture,
  Torneo,
} from 'src/models/torneo';
import { DetallePartidoComponent } from '../detalle-partido/detalle-partido.component';
import {
  fieldSorter,
  getCanchaLocale,
  getClubImage,
  getClubName,
  getTodosLosJugadores,
} from '../torneo/torneo-utilities';
import { MatDialogModule } from '@angular/material/dialog';
import { MatRippleModule } from '@angular/material/core';
import { LoadingModule } from '../loading/loading.component';

@Component({
  selector: 'app-fixture',
  templateUrl: './fixture.component.html',
  styleUrls: ['./fixture.component.scss'],
})
export class FixtureComponent implements OnChanges {
  constructor(public dialog: MatDialog) {}
  @Input()
  public torneos: Torneo[] = [];

  public loading: boolean = true;

  public fechaActualId: number = 0;

  public fixture: Fixture[] = [];

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.torneos?.currentValue.length !== 0) {
      this.initialize(
        changes.torneos.currentValue[0].equipos,
        changes.torneos.currentValue[0].canchas,
        changes.torneos.currentValue[0].fechas
      );
    }
  }

  private initialize(equipos: Equipo[], canchas: Cancha[], fechas: Fecha[]) {
    this.fixture = fechas.map(
      (x) =>
        ({
          id: parseInt(x.id),
          fecha: x.fecha,
          jugada: x.jugada,
          partidos: x.partidos.map((partido: any) => ({
            ...(partido as unknown as PartidoFixture),
            imagenLocal: getClubImage(partido.equipoLocalId, equipos) ?? '',
            imagenVisitante:
              getClubImage(partido.equipoVisitanteId, equipos) ?? '',
            nombreLocal: getClubName(partido.equipoLocalId, equipos) ?? '',
            nombreVisitante:
              getClubName(partido.equipoVisitanteId, equipos) ?? '',
          })),
          canchaLocalidad: getCanchaLocale(x.canchaId, canchas) ?? '',
          clubOrganizadorNombre:
            getClubName(x.equipoOrganizadorId, equipos) ?? '',
        } as unknown as Fixture)
    );
    this.fixture.sort(fieldSorter(['id']));
    this.fechaActualId =
      Number(this.fixture.find((x) => x.jugada === false)?.id) - 1 ?? 1;
    this.loading = false;
  }

  public getResultadoPartido(golesLocal: string[], golesVisitante: string[]) {
    return `${golesLocal.length} - ${golesVisitante.length}`;
  }

  public partidoSeleccionado(partido: PartidoFixture, fecha: Fixture) {
    if (partido.jugado) {
      this.dialog.open(DetallePartidoComponent, {
        panelClass: 'custom-dialog-container',
        data: {
          partido,
          jugadores: getTodosLosJugadores(this.torneos[0].equipos),
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
  imports: [CommonModule, matModules, LoadingModule],
})
export class FixtureModule {}
