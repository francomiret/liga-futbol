import { CommonModule } from '@angular/common';
import { Component, Input, NgModule, OnInit } from '@angular/core';
import { MatTableModule } from '@angular/material/table';
import { Observable } from 'rxjs/internal/Observable';
import { fieldSorter } from '../torneo/torneo-utilities';

interface Tarjetas {
  club: string;
  jugador: string;
  imagen: string;
  ta: number;
  tr: number;
}
@Component({
  selector: 'app-tarjetas',
  templateUrl: './tarjetas.component.html',
  styleUrls: ['./tarjetas.component.scss'],
})
export class TarjetasComponent implements OnInit {
  @Input()
  public tarjetas$: Observable<Tarjetas[]> | undefined;
  public tarjetas: Tarjetas[] = [];
  public displayedColumns = ['jugador', 'ta', 'tr'];

  ngOnInit(): void {
    this.tarjetas$?.subscribe(async (x) => {
      this.tarjetas = x;
      this.tarjetas.sort(fieldSorter(['-tr', '-ta']));
    });
  }
}

const matModules = [MatTableModule];

@NgModule({
  declarations: [TarjetasComponent],
  exports: [TarjetasComponent],
  imports: [CommonModule, matModules],
})
export class TarjetasModule {}
