import { CommonModule } from '@angular/common';
import { Component, NgModule, OnInit } from '@angular/core';
import { MatTableModule } from '@angular/material/table';
import { equipos, jugadores, partidos } from 'src/models/test-data';

interface Tarjetas {
  club: string;
  jugador: string;
  ta: number;
  tr: number;
}
@Component({
  selector: 'app-tarjetas',
  templateUrl: './tarjetas.component.html',
  styleUrls: ['./tarjetas.component.scss'],
})
export class TarjetasComponent {
  displayedColumns = ['jugador', 'club', 'ta', 'tr'];
  public tarjetas: Tarjetas[] = [];
  ngOnInit(): void {
    const jugadoresId = [
      ...new Set([
        ...Object.keys(this.obtainRedCards()),
        ...Object.keys(this.obtainYellowCards()),
      ]),
    ];

    for (let i = 0; i < jugadoresId.length; i++) {
      let jugadorId = jugadoresId[i];
      const goleador: Tarjetas = {
        jugador: this.getJugadorName(jugadorId),
        club: this.getEquipoJugador(jugadorId),
        ta: this.obtainYellowCards()[jugadorId],
        tr: this.obtainRedCards()[jugadorId],
      };
      this.tarjetas.push(goleador);
    }
  }

  public getJugadorName(id: string) {
    return jugadores.find((x) => x.id === id)?.nombre ?? '';
  }

  public getEquipoJugador(id: string) {
    return (
      equipos.find((x) => x.id === jugadores.find((x) => x.id === id)?.equipoId)
        ?.nombre ?? ''
    );
  }

  public obtainRedCards() {
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

  public obtainYellowCards() {
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

const matModules = [MatTableModule];

@NgModule({
  declarations: [TarjetasComponent],
  exports: [TarjetasComponent],
  imports: [CommonModule, matModules],
})
export class TarjetasModule {}
