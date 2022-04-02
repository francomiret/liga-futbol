import { CommonModule } from '@angular/common';
import { Component, NgModule, OnInit } from '@angular/core';
import { MatTableModule } from '@angular/material/table';

@Component({
  selector: 'app-goleadores',
  templateUrl: './goleadores.component.html',
  styleUrls: ['./goleadores.component.scss'],
})
export class GoleadoresComponent {
  displayedColumns = ['jugador', 'club', 'goles'];
  dataSource = ELEMENT_DATA;
}

export interface Goleadores {
  club: string;
  position: number;
  jugador: string;
  goles: number;
}

const ELEMENT_DATA: Goleadores[] = [
  {
    position: 1,
    club: 'C.D. Barú',
    jugador: 'Lihuen Segovia',
    goles: 100,
  },
  {
    position: 2,
    club: 'C.A. General Urquiza',
    jugador: 'Lihuen Segovia',
    goles: 100,
  },
  {
    position: 3,
    club: 'C.A. Baylina A',
    jugador: 'Lihuen Segovia',
    goles: 100,
  },
  {
    position: 4,
    club: 'C.A. Baylina B',
    jugador: 'Lihuen Segovia',
    goles: 100,
  },
  {
    position: 5,
    club: 'D. Berduc',
    jugador: 'Lihuen Segovia',
    goles: 100,
  },
  {
    position: 6,
    club: 'S. Villa Clara',
    jugador: 'Lihuen Segovia',
    goles: 100,
  },
  {
    position: 7,
    club: 'C.A.H. de Hocker',
    jugador: 'Lihuen Segovia',
    goles: 100,
  },
  {
    position: 8,
    club: 'C.D. Hambis',
    jugador: 'Lihuen Segovia',
    goles: 100,
  },
  {
    position: 9,
    club: 'C.I. de Jubileo',
    jugador: 'Lihuen Segovia',
    goles: 100,
  },
  {
    position: 10,
    club: 'Las Palmas',
    jugador: 'Lihuen Segovia',
    goles: 100,
  },
  {
    position: 11,
    club: 'Azul Azul',
    jugador: 'Lihuen Segovia',
    goles: 100,
  },
  {
    position: 12,
    club: 'C.A. San Antonio',
    jugador: 'Lihuen Segovia',
    goles: 100,
  },
];
const matModules = [MatTableModule];

@NgModule({
  declarations: [GoleadoresComponent],
  exports: [GoleadoresComponent],
  imports: [CommonModule, matModules],
})
export class GoleadoresModule {}
