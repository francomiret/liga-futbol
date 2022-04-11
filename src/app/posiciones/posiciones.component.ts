import { Component, NgModule, OnInit } from '@angular/core';
import { MatTableModule } from '@angular/material/table';
import { MatDividerModule } from '@angular/material/divider';
import { MatIconModule } from '@angular/material/icon';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { equipos, partidos } from 'src/models/test-data';
import { Equipo, Partido } from 'src/models/torneo';

interface Posicion {
  equipo: Equipo;
  pj: number;
  g: number;
  e: number;
  p: number;
  gf: number;
  gc: number;
  dg: number;
  puntos: number;
  ultimosCinco?: number[];
}

@Component({
  selector: 'app-posiciones',
  templateUrl: './posiciones.component.html',
  styleUrls: ['./posiciones.component.scss'],
})
export class PosicionesComponent implements OnInit {
  public posiciones: Posicion[] = [];
  ngOnInit(): void {
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
        if (this.esEmpate(partido)) {
          posicion = {
            ...posicion,
            e: posicion.e + 1,
          };
        } else if (this.ganoLocal(partido)) {
          posicion = {
            ...posicion,
            g: posicion.g + 1,
          };
        } else if (this.ganoVisitante(partido)) {
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
        if (this.esEmpate(partido)) {
          posicion = {
            ...posicion,
            e: posicion.e + 1,
          };
        } else if (this.ganoLocal(partido)) {
          posicion = {
            ...posicion,
            p: posicion.p + 1,
          };
        } else if (this.ganoVisitante(partido)) {
          posicion = {
            ...posicion,
            g: posicion.g + 1,
          };
        }
      });
      posicion = {
        ...posicion,
        puntos: this.getPuntos(posicion),
        dg: this.getDiferenciaDeGol(posicion),
      };
      this.posiciones.push(posicion);
    });
    // ordenado por diferencia de gol
    this.posiciones.sort(function (a, b) {
      if (a.dg < b.dg) {
        return 1;
      }
      if (a.dg > b.dg) {
        return -1;
      }
      return 0;
    });
    // ordenado por puntos
    this.posiciones.sort(function (a, b) {
      if (a.puntos < b.puntos) {
        return 1;
      }
      if (a.puntos > b.puntos) {
        return -1;
      }
      return 0;
    });
  }
  displayedColumns = ['club', 'puntos', 'g', 'e', 'p', 'pj', 'gf', 'gc', 'dg'];

  private esEmpate(partido: Partido) {
    return partido.golesLocalId.length === partido.golesVisitanteId.length;
  }

  private ganoLocal(partido: Partido) {
    return partido.golesLocalId.length > partido.golesVisitanteId.length;
  }

  private ganoVisitante(partido: Partido) {
    return partido.golesLocalId.length < partido.golesVisitanteId.length;
  }

  private getPuntos(tabla: Posicion): number {
    return tabla.g * 3 + tabla.e;
  }

  private getDiferenciaDeGol(tabla: Posicion): number {
    return tabla.gf - tabla.gc;
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
