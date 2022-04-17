import { Component } from '@angular/core';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatTabsModule } from '@angular/material/tabs';
import { MatCardModule } from '@angular/material/card';
import { PosicionesModule } from '../posiciones/posiciones.component';
import { ClubModule } from '../club/club.component';
import { FixtureModule } from '../fixture/fixture.component';
import { GoleadoresModule } from '../goleadores/goleadores.component';
import { TarjetasModule } from '../tarjetas/tarjetas.component';
import { FirebaseService } from '../firebase.service';
import {
  Equipo,
  Goleador,
  Jugador,
  Partido,
  Posicion,
  Tarjetas,
} from 'src/models/torneo';
import { Observable } from 'rxjs';
import { TorneoService } from './torneo.service';

@Component({
  selector: 'app-torneo',
  templateUrl: './torneo.component.html',
  styleUrls: ['./torneo.component.scss'],
})
export class TorneoComponent {
  public clubes: Equipo[] = [];
  public tarjetas: Observable<Tarjetas[]>;
  public goleadores: Observable<Goleador[]>;
  public posiciones: Observable<Posicion[]>;

  constructor(private torneoService: TorneoService) {
    this.clubes = this.torneoService.clubes;
    this.tarjetas = this.torneoService.tarjetas;
    this.goleadores = this.torneoService.goleadores;
    this.posiciones = this.torneoService.posiciones;
  }
}

const matModules = [MatToolbarModule, MatTabsModule, MatCardModule];

@NgModule({
  declarations: [TorneoComponent],
  exports: [TorneoComponent],
  imports: [
    BrowserModule,
    PosicionesModule,
    ClubModule,
    FixtureModule,
    GoleadoresModule,
    TarjetasModule,
    matModules,
  ],
})
export class AppModule {}
