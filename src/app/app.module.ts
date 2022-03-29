import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatDividerModule } from '@angular/material/divider';
import { StoreModule } from '@ngrx/store';
import { ClubModule } from './club/club.component';
import { MatTabsModule } from '@angular/material/tabs';
import { PosicionesModule } from './posiciones/posiciones.component';
import { FixtureModule } from './fixture/fixture.component';
import { GoleadoresModule } from './goleadores/goleadores.component';
import { TarjetasModule } from './tarjetas/tarjetas.component';

const matModules = [
  MatToolbarModule,
  MatIconModule,
  MatButtonModule,
  MatDividerModule,
  MatTabsModule,
];

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    PosicionesModule,
    ClubModule,
    FixtureModule,
    GoleadoresModule,
    TarjetasModule,
    matModules,
    // StoreModule.forRoot({}, {}),
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
