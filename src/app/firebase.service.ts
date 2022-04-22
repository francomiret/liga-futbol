import { Injectable } from '@angular/core';
import {
  AngularFirestore,
  DocumentChangeAction,
} from '@angular/fire/compat/firestore';
import { Equipo, Cancha, Fecha, Partido, Jugador } from 'src/models/torneo';
import { Observable } from 'rxjs/internal/Observable';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class FirebaseService {
  constructor(private firestore: AngularFirestore) {
    this.getTorneos();
  }

  public getTorneos() {
    return this.firestore.collection('torneos').snapshotChanges();
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
}
