import { CommonModule } from '@angular/common';
import {
  Component,
  Input,
  NgModule,
  OnChanges,
  SimpleChanges,
} from '@angular/core';
import { MatTableModule } from '@angular/material/table';
import { Equipo, Jugador, Partido, Torneo } from 'src/models/torneo';
import { LoadingModule } from '../loading/loading.component';
import {
  fieldSorter,
  getEquipoIdFormComplexId,
  getEquipoJugador,
  getImagenEquipoJugador,
  getJugadorIdFormComplexId,
  getJugadorName,
  getTodosLosJugadores,
  getTodosLosPartidos,
  obtainRedCards,
  obtainYellowCards,
} from '../torneo/torneo-utilities';

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
export class TarjetasComponent implements OnChanges {
  @Input()
  public torneos: Torneo[] = [];

  public tarjetas: Tarjetas[] = [];

  public loading: boolean = true;

  public displayedColumns = ['jugador', 'ta', 'tr'];

  ngOnChanges(changes: SimpleChanges): void {
    if (changes?.torneos?.currentValue?.length !== 0) {
      this.initialize(
        getTodosLosPartidos(changes.torneos.currentValue[0].fechas),
        changes.torneos.currentValue[0].equipos,
        getTodosLosJugadores(changes.torneos.currentValue[0].equipos)
      );
    }
  }

  private initialize(
    partidos: Partido[],
    equipos: Equipo[],
    jugadores: Jugador[]
  ) {
    const jugadoresId = [
      ...new Set([
        ...Object.keys(obtainRedCards(partidos)),
        ...Object.keys(obtainYellowCards(partidos)),
      ]),
    ];
    jugadoresId.forEach((x, i) => {
      let id = jugadoresId[i];
      const jugador: Tarjetas = {
        jugador: getJugadorName(
          getJugadorIdFormComplexId(id),
          jugadores,
          getEquipoIdFormComplexId(id)
        ),
        club: getEquipoJugador(getJugadorIdFormComplexId(id), equipos, jugadores),
        imagen: getImagenEquipoJugador(getJugadorIdFormComplexId(id), equipos, jugadores),
        ta: obtainYellowCards(partidos)[id] ?? 0,
        tr: obtainRedCards(partidos)[id] ?? 0,
      };
      this.tarjetas = [...this.tarjetas, jugador];
    });
    this.tarjetas.sort(fieldSorter(['-tr', '-ta']));
    this.loading = false;
  }
}

const matModules = [MatTableModule];

@NgModule({
  declarations: [TarjetasComponent],
  exports: [TarjetasComponent],
  imports: [CommonModule, matModules, LoadingModule],
})
export class TarjetasModule {}
