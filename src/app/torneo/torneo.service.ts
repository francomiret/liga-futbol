import { Injectable } from '@angular/core';
import { of } from 'rxjs';
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
  public torneos$: Observable<any[]>;

  constructor(private service: FirebaseService) {
    this.jugadores$ = of([]);
    this.torneos$ = this.service
      .getTorneos()
      .pipe(map((x) => x.map((x) => x.payload.doc.data())));

    this.fechas$ = of([]);

    this.equipos$ = of([]);

    this.canchas$ = of([]);

    this.partidos$ = of([]);
  }
}
