import { Component, Input, NgModule, OnInit } from '@angular/core';
import { MatTableModule } from '@angular/material/table';
import { MatDividerModule } from '@angular/material/divider';
import { MatIconModule } from '@angular/material/icon';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { equipos, partidos } from 'src/models/test-data';
import { Equipo, Partido, Posicion } from 'src/models/torneo';
import { Observable } from 'rxjs/internal/Observable';
import { fieldSorter } from '../torneo/torneo-utilities';

@Component({
  selector: 'app-posiciones',
  templateUrl: './posiciones.component.html',
  styleUrls: ['./posiciones.component.scss'],
})
export class PosicionesComponent implements OnInit {
  @Input()
  public posiciones$!: Observable<Posicion[]>;
  public posiciones: Posicion[] = [];
  ngOnInit(): void {
    this.posiciones$.subscribe((x) => {
      this.posiciones = x;
      this.posiciones.sort(fieldSorter(['-puntos', '-dg']));
    });
  }
  displayedColumns = ['club', 'puntos', 'g', 'e', 'p', 'pj', 'gf', 'gc', 'dg'];
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
