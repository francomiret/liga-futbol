import { Component, NgModule } from '@angular/core';
import { MatTableModule } from '@angular/material/table';
import { MatDividerModule } from '@angular/material/divider';
import { MatIconModule } from '@angular/material/icon';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
@Component({
  selector: 'app-posiciones',
  templateUrl: './posiciones.component.html',
  styleUrls: ['./posiciones.component.scss'],
})
export class PosicionesComponent {
  displayedColumns = ['club', 'pj', 'g', 'e', 'p', 'puntos', 'gf', 'gc', 'dg'];
  dataSource = ELEMENT_DATA;
  getPuntos(tabla: PositionsElements): number {
    return tabla.g * 3 + tabla.e;
  }
  getDiferenciaDeGol(tabla: PositionsElements): number {
    return tabla.gf - tabla.gc;
  }
}

export interface PositionsElements {
  club: string;
  position: number;
  pj: number;
  g: number;
  e: number;
  p: number;
  gf: number;
  gc: number;
  ultimosCinco?: number[];
}

const ELEMENT_DATA: PositionsElements[] = [
  {
    position: 1,
    club: 'C.D. Barú',
    pj: 13,
    gf: 100,
    e: 0,
    g: 13,
    gc: 9,
    p: 0,
  },
  {
    position: 2,
    club: 'C.A. General Urquiza',
    pj: 13,
    gf: 90,
    e: 1,
    g: 9,
    gc: 30,
    p: 3,
  },
  {
    position: 3,
    club: 'C.A. Baylina A',
    pj: 13,
    gf: 90,
    e: 1,
    g: 9,
    gc: 30,
    p: 3,
  },
  {
    position: 4,
    club: 'C.A. Baylina B',
    pj: 13,
    gf: 90,
    e: 1,
    g: 9,
    gc: 30,
    p: 3,
  },
  {
    position: 5,
    club: 'D. Berduc',
    pj: 13,
    gf: 90,
    e: 1,
    g: 9,
    gc: 30,
    p: 3,
  },
  {
    position: 6,
    club: 'S. Villa Clara',
    pj: 13,
    gf: 90,
    e: 1,
    g: 9,
    gc: 30,
    p: 3,
  },
  {
    position: 7,
    club: 'C.A.H. de Hocker',
    pj: 13,
    gf: 90,
    e: 1,
    g: 9,
    gc: 30,
    p: 3,
  },
  {
    position: 8,
    club: 'C.D. Hambis',
    pj: 13,
    gf: 90,
    e: 1,
    g: 9,
    gc: 30,
    p: 3,
  },
  {
    position: 9,
    club: 'C.I. de Jubileo',
    pj: 13,
    gf: 90,
    e: 1,
    g: 9,
    gc: 30,
    p: 3,
  },
  {
    position: 10,
    club: 'Las Palmas',
    pj: 13,
    gf: 90,
    e: 1,
    g: 9,
    gc: 30,
    p: 3,
  },
  {
    position: 11,
    club: 'Azul Azul',
    pj: 13,
    gf: 90,
    e: 1,
    g: 9,
    gc: 30,
    p: 3,
  },
  {
    position: 12,
    club: 'C.A. San Antonio',
    pj: 13,
    gf: 90,
    e: 1,
    g: 9,
    gc: 30,
    p: 3,
  },
];

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
