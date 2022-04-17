import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatDividerModule } from '@angular/material/divider';
import { ClubModule } from './club/club.component';
import { MatTabsModule } from '@angular/material/tabs';
import { PosicionesModule } from './posiciones/posiciones.component';
import { FixtureModule } from './fixture/fixture.component';
import { GoleadoresModule } from './goleadores/goleadores.component';
import { TarjetasModule } from './tarjetas/tarjetas.component';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatCardModule } from '@angular/material/card';
import { MatListModule } from '@angular/material/list';
import { environment } from '../environments/environment';
import {
  ScreenTrackingService,
  UserTrackingService,
} from '@angular/fire/analytics';
import { AngularFireModule } from '@angular/fire/compat';
import { AngularFirestoreModule } from '@angular/fire/compat/firestore';
import { FirebaseService } from './firebase.service';

const matModules = [
  MatToolbarModule,
  MatIconModule,
  MatButtonModule,
  MatDividerModule,
  MatTabsModule,
  MatSidenavModule,
  MatCardModule,
  MatListModule,
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
    AngularFireModule.initializeApp(environment.firebase),
    AngularFirestoreModule,
    matModules,
    // provideFirebaseApp(() => initializeApp(environment.firebase)),
    // provideAnalytics(() => getAnalytics()),
    // provideDatabase(() => getDatabase()),
    // provideFirestore(() => getFirestore()),
    // provideRemoteConfig(() => getRemoteConfig()),
    // provideStorage(() => getStorage()),
    // StoreModule.forRoot({}, {}),
  ],

  providers: [ScreenTrackingService, UserTrackingService, FirebaseService],
  bootstrap: [AppComponent],
})
export class AppModule {}
