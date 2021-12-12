import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatDividerModule } from '@angular/material/divider';
import { TorneoModule } from './torneo/torneo.module';
import { ClubesModule } from './clubes/clubes.module';
import { StoreModule } from '@ngrx/store';

const matModules = [
  MatToolbarModule,
  MatIconModule,
  MatButtonModule,
  MatDividerModule,
];

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    TorneoModule,
    ClubesModule,
    matModules,
    StoreModule.forRoot({}, {}),
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
