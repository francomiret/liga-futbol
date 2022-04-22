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
import { Equipo, Jugador, Partido } from 'src/models/torneo';
import { MatIconModule } from '@angular/material/icon';
import { FirebaseService } from '../firebase.service';
import { map } from 'rxjs/operators';
import {
  fieldSorter,
  getGoleadores,
  getJugador,
  getJugadoresId,
  getTodosLosPartidos,
  obtainRedCards,
  obtainYellowCards,
} from '../torneo/torneo-utilities';

@Component({
  selector: 'app-club',
  templateUrl: './club.component.html',
  styleUrls: ['./club.component.scss'],
})
export class ClubesComponent implements OnChanges {
  torneo: any;
  constructor(private service: FirebaseService) {}

  @Input()
  public partidos: Partido[] = [];

  @Input()
  public equipos: Equipo[] = [];
  @Input()
  public torneos: any[] = [];

  public clubes: Equipo[] = [];

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
          ...getJugador(jugadorId, equipo.jugadores),
          goles: getGoleadores(partidos)[jugadorId] ?? 0,
          ta: obtainYellowCards(partidos)[jugadorId] ?? 0,
          tr: obtainRedCards(partidos)[jugadorId] ?? 0,
        };
        jugadores.push(jugador);
        jugadores.sort(fieldSorter(['nombre']));
      }
      equipo = { ...equipo, jugadores };
      this.clubes.push(equipo);
      this.clubes.sort(fieldSorter(['nombre']));
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
  imports: [CommonModule, materialModules],
})
export class ClubModule {}
