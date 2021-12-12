import { Component } from '@angular/core';

@Component({
  selector: 'app-posiciones',
  templateUrl: './posiciones.component.html',
  styleUrls: ['./posiciones.component.scss'],
})
export class PosicionesComponent {
  displayedColumns = [
    'position',
    'club',
    'pj',
    'g',
    'e',
    'p',
    'gf',
    'gc',
    'dg',
    'puntos',
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
    club: 'Club Deportivo Bar',
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
    club: 'Club Atlético General Urquiza',
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
    club: 'Club Atlético Baylina A',
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
    club: 'Club Atlético Baylina B',
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
    club: 'Deportivo Berduc',
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
    club: 'Sportivo Villa Clara',
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
    club: 'Club Atlético Huracán de Hocker',
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
    club: 'Club Deportivo Hambis',
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
    club: 'Club Independiente de Jubileo',
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
    club: 'Club Atlético San Antonio',
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
