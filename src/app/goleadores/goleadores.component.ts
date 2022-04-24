import { CommonModule } from '@angular/common';
import {
  Component,
  Input,
  NgModule,
  OnChanges,
  SimpleChanges,
} from '@angular/core';
import { MatTableModule } from '@angular/material/table';
import { Equipo, Goleador, Jugador, Partido, Torneo } from 'src/models/torneo';
import {
  fieldSorter,
  getEquipoJugador,
  getGoleadores,
  getImagenEquipoJugador,
  getJugadorName,
  getTodosLosJugadores,
  getTodosLosPartidos,
} from '../torneo/torneo-utilities';

@Component({
  selector: 'app-goleadores',
  templateUrl: './goleadores.component.html',
  styleUrls: ['./goleadores.component.scss'],
})
export class GoleadoresComponent implements OnChanges {
  @Input()
  public torneos: Torneo[] = [];

  public goleadores: Goleador[] = [];

  public loading: boolean = true;

  public displayedColumns = ['jugador', 'goles'];

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
    const goleadoresId = Object.keys(getGoleadores(partidos));
    let goleador: Goleador = {
      club: '',
      jugador: '',
      imagen: '',
      goles: 0,
    };

    goleadoresId.forEach((x, i) => {
      let jugadorId = goleadoresId[i];
      goleador = {
        jugador: getJugadorName(jugadorId, jugadores),
        club: getEquipoJugador(jugadorId, equipos, jugadores),
        imagen: getImagenEquipoJugador(jugadorId, equipos, jugadores),
        goles: getGoleadores(partidos)[jugadorId],
      };
      this.goleadores = [...this.goleadores, goleador];
    });
    this.goleadores.sort(fieldSorter(['-goles']));
    this.loading = false;
  }
}

const matModules = [MatTableModule];

@NgModule({
  declarations: [GoleadoresComponent],
  exports: [GoleadoresComponent],
  imports: [CommonModule, matModules],
})
export class GoleadoresModule {}
