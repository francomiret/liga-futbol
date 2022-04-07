import { CommonModule } from '@angular/common';
import { Component, NgModule, OnInit } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatDividerModule } from '@angular/material/divider';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatIconModule } from '@angular/material/icon';
import {MatChipsModule} from '@angular/material/chips';
import { MatSelectModule } from '@angular/material/select';

interface Food {
  value: string;
  viewValue: string;
}

@Component({
  selector: 'app-fixture',
  templateUrl: './fixture.component.html',
  styleUrls: ['./fixture.component.scss'],
})
export class FixtureComponent implements OnInit {
  constructor() {}
  selectedValue: string | undefined;
  
  fixture = [
    {
      id: 1,
      fecha:'22/08/2022',
      organizador: 'C.D. Barú',
      cancha: 'Baru Stadium',
      partidos: [
        {
          local: 'C.D. Barú',
          visitante: 'C.A. General Urquiza',
          resultado: null,
          horario: '20:30',
        },
        {
          local: 'C.D. Barú',
          visitante: 'C.A. General Urquiza',
          resultado: null,
          horario: '20:30',
        },
        {
          local: 'C.D. Barú',
          visitante: 'C.A. General Urquiza',
          resultado: null,
          horario: '20:30',
        },
        {
          local: 'C.D. Barú',
          visitante: 'C.A. General Urquiza',
          resultado: null,
          horario: '20:30',
        },
        {
          local: 'C.D. Barú',
          visitante: 'C.A. General Urquiza',
          resultado: null,
          horario: '20:30',
        },
        {
          local: 'C.D. Barú',
          visitante: 'C.A. General Urquiza',
          resultado: '3 - 0',
          horario: '20:30',
        },
      ],
    },
    {
      id: 2,
      fecha:'22/08/2022',
      organizador: 'C.A. General Urquiza',
      cancha: 'La Clarita',
      partidos: [
        {
          local: 'C.D. Barú',
          visitante: 'C.A. General Urquiza',
          resultado: null,
          horario: '20:30',
        },
        {
          local: 'C.D. Barú',
          visitante: 'C.A. General Urquiza',
          resultado: null,
          horario: '20:30',
        },
        {
          local: 'C.D. Barú',
          visitante: 'C.A. General Urquiza',
          resultado: null,
          horario: '20:30',
        },
        {
          local: 'C.D. Barú',
          visitante: 'C.A. General Urquiza',
          resultado: null,
          horario: '20:30',
        },
        {
          local: 'C.D. Barú',
          visitante: 'C.A. General Urquiza',
          resultado: null,
          horario: '20:30',
        },
        {
          local: 'C.D. Barú',
          visitante: 'C.A. General Urquiza',
          resultado: '3 - 0',
          horario: '20:30',
        },
      ],
    },
  ];

  foods: Food[] = [
    { value: '1', viewValue: 'Fecha 1' },
    { value: '2', viewValue: 'Fecha 2' },
    { value: '3', viewValue: 'Fecha 3' },
  ];
  ngOnInit(): void {}
}
const matModules = [
  MatSelectModule,
  MatCardModule,
  MatIconModule,
  MatDividerModule,
  MatGridListModule,
  MatChipsModule,
];

@NgModule({
  declarations: [FixtureComponent],
  exports: [FixtureComponent],
  imports: [CommonModule, matModules],
})
export class FixtureModule {}
