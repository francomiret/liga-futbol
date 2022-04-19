import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { map } from 'rxjs/operators';
import { Cancha, Equipo, Fecha, Jugador, Partido } from 'src/models/torneo';
import { FirebaseService } from '../firebase.service';

@Injectable({
  providedIn: 'root',
})
export class TorneoService {
  public jugadores$: Observable<Jugador[]>;
  public partidos$: Observable<Partido[]>;
  public canchas$: Observable<Cancha[]>;
  public equipos$: Observable<Equipo[]>;
  public fechas$: Observable<Fecha[]>;

  constructor(private service: FirebaseService) {
    this.jugadores$ = this.service
      .getJugadores()
      .pipe(map((x) => x.map((x) => x.payload.doc.data())));

    this.fechas$ = this.service
      .getFechas()
      .pipe(map((x) => x.map((x) => x.payload.doc.data())));

    this.equipos$ = this.service
      .getEquipos()
      .pipe(map((x) => x.map((x) => x.payload.doc.data())));

    this.canchas$ = this.service
      .getCanchas()
      .pipe(map((x) => x.map((x) => x.payload.doc.data())));

    this.partidos$ = this.service
      .getPartidos()
      .pipe(map((x) => x.map((x) => x.payload.doc.data())));
  }
}
