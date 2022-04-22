import {
  Component,
  Input,
  NgModule,
  OnChanges,
  SimpleChanges,
} from '@angular/core';
import { MatTableModule } from '@angular/material/table';
import { MatDividerModule } from '@angular/material/divider';
import { MatIconModule } from '@angular/material/icon';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { Equipo, Partido, Posicion, Torneo } from 'src/models/torneo';
import {
  esEmpate,
  fieldSorter,
  ganoLocal,
  ganoVisitante,
  getDiferenciaDeGol,
  getPuntos,
  getTodosLosPartidos,
} from '../torneo/torneo-utilities';

@Component({
  selector: 'app-posiciones',
  templateUrl: './posiciones.component.html',
  styleUrls: ['./posiciones.component.scss'],
})
export class PosicionesComponent implements OnChanges {
  ngOnChanges(changes: SimpleChanges): void {
    if (changes?.torneos?.currentValue?.length !== 0) {
      this.initialize(
        getTodosLosPartidos(changes.torneos.currentValue[0].fechas),
        changes.torneos.currentValue[0].equipos
      );
    }
  }

  @Input()
  public torneos: Torneo[] = [];

  public posiciones: Posicion[] = [];
  public displayedColumns = [
    'club',
    'puntos',
    'g',
    'e',
    'p',
    'pj',
    'gf',
    'gc',
    'dg',
  ];

  private initialize(partidos: Partido[], equipos: Equipo[]) {
    equipos.forEach((equipo) => {
      let posicion: Posicion = {
        equipo: equipo,
        e: 0,
        g: 0,
        p: 0,
        gc: 0,
        gf: 0,
        pj: 0,
        dg: 0,
        puntos: 0,
      };
      const partidosLocal = partidos.filter(
        (x) => x.equipoLocalId === equipo.id && x.jugado === true
      );
      const partidosVisitante = partidos.filter(
        (x) => x.equipoVisitanteId === equipo.id && x.jugado === true
      );

      partidosLocal.forEach((partido) => {
        posicion = {
          ...posicion,
          gf: posicion.gf + partido.golesLocalId.length,
          gc: posicion.gc + partido.golesVisitanteId.length,
          pj: posicion.pj + 1,
        };
        if (esEmpate(partido)) {
          posicion = {
            ...posicion,
            e: posicion.e + 1,
          };
        } else if (ganoLocal(partido)) {
          posicion = {
            ...posicion,
            g: posicion.g + 1,
          };
        } else if (ganoVisitante(partido)) {
          posicion = {
            ...posicion,
            p: posicion.p + 1,
          };
        }
      });

      partidosVisitante.forEach((partido) => {
        posicion = {
          ...posicion,
          gf: posicion.gf + partido.golesVisitanteId.length,
          gc: posicion.gc + partido.golesLocalId.length,
          pj: posicion.pj + 1,
        };
        if (esEmpate(partido)) {
          posicion = {
            ...posicion,
            e: posicion.e + 1,
          };
        } else if (ganoLocal(partido)) {
          posicion = {
            ...posicion,
            p: posicion.p + 1,
          };
        } else if (ganoVisitante(partido)) {
          posicion = {
            ...posicion,
            g: posicion.g + 1,
          };
        }
      });
      posicion = {
        ...posicion,
        puntos: getPuntos(posicion),
        dg: getDiferenciaDeGol(posicion),
      };
      this.posiciones = [...this.posiciones, posicion];
    });
    this.posiciones.sort(fieldSorter(['-puntos', '-dg']));
  }
}

const matModules = [
  MatTableModule,
  MatDividerModule,
  MatIconModule,
  MatCardModule,
];

@NgModule({
  declarations: [PosicionesComponent],
  exports: [PosicionesComponent],
  imports: [CommonModule, matModules],
})
export class PosicionesModule {}
