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
import {
  fieldSorter,
  getEquipoJugador,
  getImagenEquipoJugador,
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
      let jugadorId = jugadoresId[i];
      const jugador: Tarjetas = {
        jugador: getJugadorName(jugadorId, jugadores),
        club: getEquipoJugador(jugadorId, equipos, jugadores),
        imagen: getImagenEquipoJugador(jugadorId, equipos, jugadores),
        ta: obtainYellowCards(partidos)[jugadorId] ?? 0,
        tr: obtainRedCards(partidos)[jugadorId] ?? 0,
      };
      this.tarjetas = [...this.tarjetas, jugador];
    });
    this.tarjetas.sort(fieldSorter(['-tr', '-ta']));
  }
}

const matModules = [MatTableModule];

@NgModule({
  declarations: [TarjetasComponent],
  exports: [TarjetasComponent],
  imports: [CommonModule, matModules],
})
export class TarjetasModule {}
