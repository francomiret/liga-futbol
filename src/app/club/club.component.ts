import { CommonModule } from '@angular/common';
import { Component, NgModule, OnInit } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { canchas, equipos, jugadores, partidos } from 'src/models/test-data';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatTableModule } from '@angular/material/table';
import { Jugador } from 'src/models/torneo';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-club',
  templateUrl: './club.component.html',
  styleUrls: ['./club.component.scss'],
})
export class ClubesComponent implements OnInit {
  public clubes = equipos;
  public panelOpenState = false;
  public displayedColumns = ['jugador', 'goles', 'ta', 'tr'];
  ngOnInit(): void {
    this.clubes.forEach((club) => {
      club.jugadores = [];
      const jugadoresId = [...new Set([...this.getJugadoresId(club.id)])];
      for (let i = 0; i < jugadoresId.length; i++) {
        let jugadorId = jugadoresId[i];
        const jugador: Jugador = {
          ...this.getJugador(jugadorId),
          goles: this.getGoleadores()[jugadorId],
          ta: this.obtainYellowCards()[jugadorId],
          tr: this.obtainRedCards()[jugadorId],
        };
        club.jugadores.push(jugador);
      }
    });
  }

  private getJugadoresId(id: string) {
    return jugadores.filter((x) => x.equipoId === id)?.map((x) => x.id) ?? '';
  }

  private getJugador(id: string) {
    return jugadores.find((x) => x.id === id) ?? jugadores[0];
  }

  private getLocalidad(id: string) {
    return canchas.find((x) => x.id === id)?.localidad;
  }

  private getGoleadores() {
    const allGoleadores: string[] = [];
    let repetidos: Record<string, number> = {};

    partidos.forEach((partido) => {
      allGoleadores.push(...partido.golesLocalId);
      allGoleadores.push(...partido.golesVisitanteId);
    });

    allGoleadores.forEach(function (numero) {
      repetidos[numero] = (repetidos[numero] || 0) + 1;
    });
    return repetidos;
  }

  private obtainRedCards() {
    const allRedCards: string[] = [];
    let repetidos: Record<string, number> = {};

    partidos.forEach((partido) => {
      allRedCards.push(...partido.rojasLocalId);
      allRedCards.push(...partido.rojasVisitanteId);
    });
    allRedCards.forEach(function (numero) {
      repetidos[numero] = (repetidos[numero] || 0) + 1;
    });
    return repetidos;
  }

  private obtainYellowCards() {
    const allYellowCards: string[] = [];
    let repetidos: Record<string, number> = {};

    partidos.forEach((partido) => {
      allYellowCards.push(...partido.amarillasLocalId);
      allYellowCards.push(...partido.amarillasVisitanteId);
    });
    allYellowCards.forEach(function (numero) {
      repetidos[numero] = (repetidos[numero] || 0) + 1;
    });
    return repetidos;
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
