import { CommonModule } from '@angular/common';
import { Component, NgModule, OnInit } from '@angular/core';
import { MatTableModule } from '@angular/material/table';
import { equipos, jugadores, partidos } from 'src/models/test-data';

interface Goleador {
  club: string;
  jugador: string;
  imagen: string;
  goles: number;
}

@Component({
  selector: 'app-goleadores',
  templateUrl: './goleadores.component.html',
  styleUrls: ['./goleadores.component.scss'],
})
export class GoleadoresComponent implements OnInit {
  public goleadores: Goleador[] = [];
  ngOnInit(): void {
    const goleadoresId = Object.keys(this.getGoleadores());
    for (let i = 0; i < goleadoresId.length; i++) {
      let jugadorId = goleadoresId[i];
      const goleador: Goleador = {
        jugador: this.getJugadorName(jugadorId),
        club: this.getEquipoJugador(jugadorId),
        imagen: this.getImagenEquipoJugador(jugadorId),
        goles: this.getGoleadores()[jugadorId],
      };
      this.goleadores.push(goleador);
    }
  }
  displayedColumns = ['jugador', 'goles'];

  private getJugadorName(id: string) {
    return jugadores.find((x) => x.id === id)?.nombre ?? '';
  }

  private getEquipoJugador(id: string) {
    return (
      equipos.find((x) => x.id === jugadores.find((x) => x.id === id)?.equipoId)
        ?.nombre ?? ''
    );
  }

  private getImagenEquipoJugador(id: string) {
    return (
      equipos.find((x) => x.id === jugadores.find((x) => x.id === id)?.equipoId)
        ?.imagen ?? ''
    );
  }

  public getGoleadores() {
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
}

const matModules = [MatTableModule];

@NgModule({
  declarations: [GoleadoresComponent],
  exports: [GoleadoresComponent],
  imports: [CommonModule, matModules],
})
export class GoleadoresModule {}
