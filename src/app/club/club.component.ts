import { CommonModule } from '@angular/common';
import {
  Component,
  Input,
  NgModule,
  OnChanges,
  SimpleChanges,
} from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatTableModule } from '@angular/material/table';
import { Equipo, Jugador, Partido, Torneo } from 'src/models/torneo';
import { MatIconModule } from '@angular/material/icon';
import { FirebaseService } from '../firebase.service';
import {
  fieldSorter,
  getGoleadores,
  getJugador,
  getTodosLosPartidos,
  obtainRedCards,
  obtainYellowCards,
} from '../torneo/torneo-utilities';
import { LoadingModule } from '../loading/loading.component';

@Component({
  selector: 'app-club',
  templateUrl: './club.component.html',
  styleUrls: ['./club.component.scss'],
})
export class ClubesComponent implements OnChanges {
  @Input()
  public torneos: Torneo[] = [];

  public clubes: Equipo[] = [];

  public loading: boolean = true;

  public panelOpenState = false;

  public displayedColumns = ['jugador', 'goles', 'ta', 'tr'];

  ngOnChanges(changes: SimpleChanges): void {
    if (changes?.torneos?.currentValue?.length !== 0) {
      this.initialize(
        getTodosLosPartidos(changes.torneos.currentValue[0].fechas),
        changes.torneos.currentValue[0].equipos
      );
    }
  }

  private initialize(partidos: Partido[], equipos: Equipo[]) {
    equipos.forEach((equipo) => {
      const jugadores = [];
      const jugadoresId = [...equipo.jugadores.map((x) => x.id)];
      for (let i = 0; i < jugadoresId.length; i++) {
        let jugadorId = jugadoresId[i];
        const jugador: Jugador = {
          ...getJugador(jugadorId, equipo.jugadores, equipo.id),
          goles: getGoleadores(partidos)[jugadorId + '.' + equipo.id] ?? 0,
          ta: obtainYellowCards(partidos)[jugadorId + '.' + equipo.id] ?? 0,
          tr: obtainRedCards(partidos)[jugadorId + '.' + equipo.id] ?? 0,
        };
        jugadores.push(jugador);
        jugadores.sort(fieldSorter(['nombre']));
      }
      equipo = { ...equipo, jugadores };
      this.clubes.push(equipo);
      this.clubes.sort(fieldSorter(['nombre']));
      this.loading = false;
    });
  }
}

const materialModules = [
  MatCardModule,
  MatExpansionModule,
  MatTableModule,
  MatIconModule,
];

@NgModule({
  declarations: [ClubesComponent],
  exports: [ClubesComponent],
  imports: [CommonModule, materialModules, LoadingModule],
})
export class ClubModule {}
