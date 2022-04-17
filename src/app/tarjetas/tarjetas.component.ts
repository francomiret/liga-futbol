import { CommonModule } from '@angular/common';
import {
  Component,
  Input,
  NgModule,
  OnChanges,
  OnInit,
  SimpleChanges,
} from '@angular/core';
import { MatTableModule } from '@angular/material/table';
import { Observable } from 'rxjs/internal/Observable';
import { equipos, jugadores, partidos } from 'src/models/test-data';
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
  ngOnInit(): void {
    this.tarjetas$?.subscribe(async (x) => {
      this.tarjetas = x;
      this.tarjetas.sort(fieldSorter(['-tr', '-ta']));
    });
  }
  displayedColumns = ['jugador', 'ta', 'tr'];
  @Input()
  public tarjetas$: Observable<Tarjetas[]> | undefined;
  public tarjetas: Tarjetas[] = [];
}

const matModules = [MatTableModule];

@NgModule({
  declarations: [TarjetasComponent],
  exports: [TarjetasComponent],
  imports: [CommonModule, matModules],
})
export class TarjetasModule {}
