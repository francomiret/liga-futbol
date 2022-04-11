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

@Component({
  selector: 'app-torneo',
  templateUrl: './torneo.component.html',
  styleUrls: ['./torneo.component.scss'],
})
export class TorneoComponent {}

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
