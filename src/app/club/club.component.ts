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
  obtainRedCards,
  obtainYellowCards,
} from '../torneo/torneo-utilities';

@Component({
  selector: 'app-club',
  templateUrl: './club.component.html',
  styleUrls: ['./club.component.scss'],
})
export class ClubesComponent implements OnChanges {
  constructor(private service: FirebaseService) {}

  @Input()
  public partidos: Partido[] = [];

  @Input()
  public equipos: Equipo[] = [];

  public clubes: Equipo[] = [];

  public panelOpenState = false;

  public displayedColumns = ['jugador', 'goles', 'ta', 'tr'];

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.partidos || changes.equipos) {
      this.initialize(
        changes.partidos.currentValue,
        changes.equipos.currentValue
      );
    }
  }

  private initialize(partidos: Partido[], equipos: Equipo[]) {
    equipos.forEach((equipo) => {
      this.service
        .getJugadoresDeUnEquipo(equipo.id)
        .pipe(
          map((x) => ({
            ...equipo,
            jugadores: x,
          })),
          map((equipo) => {
            const jugadores = [];
            const jugadoresId = [
              ...new Set([...getJugadoresId(equipo.id, equipo.jugadores)]),
            ];
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
            return equipo;
          })
        )
        .subscribe((equipo) => {
          this.clubes.push(equipo);
          this.clubes.sort(fieldSorter(['nombre']));
        });
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
