import { CommonModule } from '@angular/common';
import { Component, Input, NgModule, OnInit } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatDividerModule } from '@angular/material/divider';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatIconModule } from '@angular/material/icon';
import { MatTabsModule } from '@angular/material/tabs';
import { Observable } from 'rxjs/internal/Observable';
import { equipos, fechas, canchas, partidos } from 'src/models/test-data';
import { Fecha, Fixture, Partido } from 'src/models/torneo';
import { fieldSorter } from '../torneo/torneo-utilities';

@Component({
  selector: 'app-fixture',
  templateUrl: './fixture.component.html',
  styleUrls: ['./fixture.component.scss'],
})
export class FixtureComponent implements OnInit {
  @Input()
  public fixture$!: Observable<Fixture[]>;
  public fixture: Fixture[] = [];

  public fechaActualId: number = 0;
  ngOnInit(): void {
    this.fixture$.subscribe((x) => {
      this.fixture = x;
      this.fixture.sort(fieldSorter(['id']));
      this.fechaActualId =
        Number(this.fixture.find((x) => x.jugada === false)?.id) - 1 ?? 1;
      console.log(this.fechaActualId);
    });
  }
  public getResultadoPartido(golesLocal: string[], golesVisitante: string[]) {
    return `${golesLocal.length} - ${golesVisitante.length}`;
  }
}
const matModules = [
  MatCardModule,
  MatIconModule,
  MatDividerModule,
  MatGridListModule,
  MatTabsModule,
];

@NgModule({
  declarations: [FixtureComponent],
  exports: [FixtureComponent],
  imports: [CommonModule, matModules],
})
export class FixtureModule {}
