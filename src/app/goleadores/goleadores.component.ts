import { CommonModule } from '@angular/common';
import { Component, Input, NgModule, OnInit } from '@angular/core';
import { MatTableModule } from '@angular/material/table';
import { Observable } from 'rxjs/internal/Observable';
import { Goleador } from 'src/models/torneo';
import { fieldSorter } from '../torneo/torneo-utilities';

@Component({
  selector: 'app-goleadores',
  templateUrl: './goleadores.component.html',
  styleUrls: ['./goleadores.component.scss'],
})
export class GoleadoresComponent implements OnInit {
  @Input()
  public goleadores$: Observable<Goleador[]> | undefined;
  public goleadores: Goleador[] = [];
  public displayedColumns = ['jugador', 'goles'];

  ngOnInit(): void {
    this.goleadores$?.subscribe(async (x) => {
      this.goleadores = x;
      this.goleadores.sort(fieldSorter(['-goles']));
    });
  }
}

const matModules = [MatTableModule];

@NgModule({
  declarations: [GoleadoresComponent],
  exports: [GoleadoresComponent],
  imports: [CommonModule, matModules],
})
export class GoleadoresModule {}
