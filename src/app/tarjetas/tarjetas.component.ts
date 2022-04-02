import { CommonModule } from '@angular/common';
import { Component, NgModule, OnInit } from '@angular/core';
import { MatTableModule } from '@angular/material/table';

@Component({
  selector: 'app-tarjetas',
  templateUrl: './tarjetas.component.html',
  styleUrls: ['./tarjetas.component.scss'],
})
export class TarjetasComponent {
  displayedColumns = ['jugador', 'club', 'ta', 'tr'];
  dataSource = ELEMENT_DATA;
}

export interface Tarjetas {
  club: string;
  position: number;
  jugador: string;
  ta: number;
  tr: number;
}

const ELEMENT_DATA: Tarjetas[] = [
  {
    position: 1,
    club: 'C.D. Barú',
    jugador: 'Lihuen Segovia',
    ta: 2,
    tr: 10,
  },
  {
    position: 2,
    club: 'C.A. General Urquiza',
    jugador: 'Lihuen Segovia',
    ta: 2,
    tr: 10,
  },
  {
    position: 3,
    club: 'C.A. Baylina A',
    jugador: 'Lihuen Segovia',
    ta: 2,
    tr: 10,
  },
  {
    position: 4,
    club: 'C.A. Baylina B',
    jugador: 'Lihuen Segovia',
    ta: 2,
    tr: 10,
  },
  {
    position: 5,
    club: 'D. Berduc',
    jugador: 'Lihuen Segovia',
    ta: 2,
    tr: 10,
  },
  {
    position: 6,
    club: 'S. Villa Clara',
    jugador: 'Lihuen Segovia',
    ta: 2,
    tr: 10,
  },
  {
    position: 7,
    club: 'C.A.H. de Hocker',
    jugador: 'Lihuen Segovia',
    ta: 2,
    tr: 10,
  },
  {
    position: 8,
    club: 'C.D. Hambis',
    jugador: 'Lihuen Segovia',
    ta: 2,
    tr: 10,
  },
  {
    position: 9,
    club: 'C.I. de Jubileo',
    jugador: 'Lihuen Segovia',
    ta: 2,
    tr: 10,
  },
];
const matModules = [MatTableModule];

@NgModule({
  declarations: [TarjetasComponent],
  exports: [TarjetasComponent],
  imports: [CommonModule, matModules],
})
export class TarjetasModule {}
