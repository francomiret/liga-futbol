import { CommonModule } from '@angular/common';
import {
  Component,
  Input,
  NgModule,
  OnChanges,
  SimpleChanges,
} from '@angular/core';
import { MatTableModule } from '@angular/material/table';
import { Equipo, Goleador, Jugador, Partido } from 'src/models/torneo';
import {
  fieldSorter,
  getEquipoJugador,
  getGoleadores,
  getImagenEquipoJugador,
  getJugadorName,
} from '../torneo/torneo-utilities';

@Component({
  selector: 'app-goleadores',
  templateUrl: './goleadores.component.html',
  styleUrls: ['./goleadores.component.scss'],
})
export class GoleadoresComponent implements OnChanges {
  @Input()
  public jugadores: Jugador[] = [];

  @Input()
  public partidos: Partido[] = [];

  @Input()
  public equipos: Equipo[] = [];

  public goleadores: Goleador[] = [];

  public displayedColumns = ['jugador', 'goles'];

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.jugadores && changes.partidos && changes.equipos) {
      this.initialize(
        changes.partidos.currentValue,
        changes.equipos.currentValue,
        changes.jugadores.currentValue
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
      this.goleadores.push(goleador);
    });
    this.goleadores.sort(fieldSorter(['-goles']));
  }
}

const matModules = [MatTableModule];

@NgModule({
  declarations: [GoleadoresComponent],
  exports: [GoleadoresComponent],
  imports: [CommonModule, matModules],
})
export class GoleadoresModule {}
