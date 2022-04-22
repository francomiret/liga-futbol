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
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { TorneoService } from './torneo.service';
import { Observable } from 'rxjs/internal/Observable';
import { Cancha, Equipo, Fecha, Jugador, Partido } from 'src/models/torneo';

@Component({
  selector: 'app-torneo',
  templateUrl: './torneo.component.html',
  styleUrls: ['./torneo.component.scss'],
})
export class TorneoComponent {
  public jugadores$: Observable<Jugador[]>;

  public partidos$: Observable<Partido[]>;

  public canchas$: Observable<Cancha[]>;

  public equipos$: Observable<Equipo[]>;

  public fechas$: Observable<Fecha[]>;
  
  public torneos$: Observable<any[]>;

  constructor(private service: TorneoService) {
    this.canchas$ = this.service.canchas$;
    this.fechas$ = this.service.fechas$;
    this.equipos$ = this.service.equipos$;
    this.partidos$ = this.service.partidos$;
    this.jugadores$ = this.service.jugadores$;
    this.torneos$ = this.service.torneos$;
  }
}

const matModules = [
  MatToolbarModule,
  MatTabsModule,
  MatCardModule,
  MatProgressSpinnerModule,
];

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
