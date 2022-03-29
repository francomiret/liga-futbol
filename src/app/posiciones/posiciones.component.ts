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
  displayedColumns = [
    'club',
    'pj',
    'g',
    'e',
    'p',
    'puntos',
    'gf',
    'gc',
    'dg',
  ];
  dataSource = ELEMENT_DATA;
}

export interface PositionsElements {
  club: string;
  position: number;
  puntos: number;
  pj: number;
  g: number;
  e: number;
  p: number;
  gf: number;
  gc: number;
  dg: number;
  ultimosCinco?: number[];
}

const ELEMENT_DATA: PositionsElements[] = [
  {
    position: 1,
    club: 'C.D. Barú',
    puntos: 39,
    pj: 13,
    gf: 10,
    dg: 30,
    e: 0,
    g: 13,
    gc: 9,
    p: 0,
  },
  {
    position: 2,
    club: 'C.A. General Urquiza',
    puntos: 29,
    pj: 13,
    gf: 90,
    dg: 60,
    e: 1,
    g: 9,
    gc: 30,
    p: 3,
  },
  {
    position: 3,
    club: 'C.A. Baylina A',
    puntos: 29,
    pj: 13,
    gf: 90,
    dg: 60,
    e: 1,
    g: 9,
    gc: 30,
    p: 3,
  },
  {
    position: 4,
    club: 'C.A. Baylina B',
    puntos: 29,
    pj: 13,
    gf: 90,
    dg: 60,
    e: 1,
    g: 9,
    gc: 30,
    p: 3,
  },
  {
    position: 5,
    club: 'D. Berduc',
    puntos: 29,
    pj: 13,
    gf: 90,
    dg: 60,
    e: 1,
    g: 9,
    gc: 30,
    p: 3,
  },
  {
    position: 6,
    club: 'S. Villa Clara',
    puntos: 29,
    pj: 13,
    gf: 90,
    dg: 60,
    e: 1,
    g: 9,
    gc: 30,
    p: 3,
  },
  {
    position: 7,
    club: 'C.A.H. de Hocker',
    puntos: 29,
    pj: 13,
    gf: 90,
    dg: 60,
    e: 1,
    g: 9,
    gc: 30,
    p: 3,
  },
  {
    position: 8,
    club: 'C.D. Hambis',
    puntos: 29,
    pj: 13,
    gf: 90,
    dg: 60,
    e: 1,
    g: 9,
    gc: 30,
    p: 3,
  },
  {
    position: 9,
    club: 'C.I. de Jubileo',
    puntos: 29,
    pj: 13,
    gf: 90,
    dg: 60,
    e: 1,
    g: 9,
    gc: 30,
    p: 3,
  },
  {
    position: 10,
    club: 'Las Palmas',
    puntos: 29,
    pj: 13,
    gf: 90,
    dg: 60,
    e: 1,
    g: 9,
    gc: 30,
    p: 3,
  },
  {
    position: 11,
    club: 'Azul Azul',
    puntos: 29,
    pj: 13,
    gf: 90,
    dg: 60,
    e: 1,
    g: 9,
    gc: 30,
    p: 3,
  },
  {
    position: 12,
    club: 'C.A. San Antonio',
    puntos: 29,
    pj: 13,
    gf: 90,
    dg: 60,
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
