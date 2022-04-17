import { Injectable } from '@angular/core';
import {
  AngularFirestore,
  DocumentChangeAction,
} from '@angular/fire/compat/firestore';
import {
  Equipo,
  Torneo,
  Cancha,
  Fecha,
  Partido,
  Jugador,
} from 'src/models/torneo';
import { Observable } from 'rxjs/internal/Observable';
import { map, withLatestFrom } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class FirebaseService {
  constructor(private firestore: AngularFirestore) {
    this.getTorneos().subscribe((torneos) => {
      torneos.forEach((torneo: any) => {
        this.torneos.push(torneo.payload.doc.data());
      });
    });

    this.getCanchas().subscribe((canchas) => {
      canchas.forEach((cancha: any) => {
        this.canchas.push(cancha.payload.doc.data());
      });
    });

    this.getFechas().subscribe((fechas) => {
      fechas.forEach((fecha: any) => {
        this.fechas.push(fecha.payload.doc.data());
      });
    });
  }

  public torneos: Torneo[] = [];
  public partidos: Partido[] = [];
  public fechas: Fecha[] = [];
  public canchas: Cancha[] = [];
  public jugadores: Jugador[] = [];
  public equipos: Equipo[] = [];

  public getTorneos() {
    return this.firestore.collection('torneos').snapshotChanges() as Observable<
      DocumentChangeAction<Torneo>[]
    >;
  }

  public getPartidos() {
    return this.firestore
      .collection('partidos')
      .snapshotChanges() as Observable<DocumentChangeAction<Partido>[]>;
  }

  public getFechas() {
    return this.firestore.collection('fechas').snapshotChanges() as Observable<
      DocumentChangeAction<Fecha>[]
    >;
  }

  public getCanchas() {
    return this.firestore.collection('canchas').snapshotChanges() as Observable<
      DocumentChangeAction<Cancha>[]
    >;
  }

  public getJugadores() {
    return this.firestore
      .collection('jugadores')
      .snapshotChanges() as Observable<DocumentChangeAction<Jugador>[]>;
  }

  public getEquipos() {
    return this.firestore.collection('equipos').snapshotChanges() as Observable<
      DocumentChangeAction<Equipo>[]
    >;
  }

  public getJugadoresDeUnEquipo(equipoId: string) {
    const filter = (ref: any) => ref.where('equipoId', '==', equipoId);
    return (
      this.firestore
        .collection('jugadores', filter)
        .snapshotChanges() as Observable<DocumentChangeAction<Jugador>[]>
    ).pipe(
      map((checks: DocumentChangeAction<Jugador>[]) =>
        checks.map((check: DocumentChangeAction<Jugador>) => {
          const data = check.payload.doc.data();
          data.id = check.payload.doc.id;
          return data;
        })
      )
    );
  }

  public getJugador(id: string): Observable<any> {
    return this.firestore.collection('jugadores').doc(id).snapshotChanges();
  }

  public getEquipo(id: string): Observable<any> {
    return this.firestore.collection('equipos').doc(id).snapshotChanges();
  }

  public getPartido(id: string): Observable<any> {
    return this.firestore.collection('partidos').doc(id).snapshotChanges();
  }
}