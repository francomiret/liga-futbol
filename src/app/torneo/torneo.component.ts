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

@Component({
  selector: 'app-torneo',
  templateUrl: './torneo.component.html',
  styleUrls: ['./torneo.component.scss'],
})
export class TorneoComponent {
  public torneos$: Observable<any[]>;

  constructor(private service: TorneoService) {
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
