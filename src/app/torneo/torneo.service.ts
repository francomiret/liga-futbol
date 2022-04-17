import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { map, switchMap, take, tap } from 'rxjs/operators';
import { Equipo, Goleador, Jugador, Tarjetas } from 'src/models/torneo';
import { FirebaseService } from '../firebase.service';
import {
  getEquipoJugador,
  getGoleadores,
  getImagenEquipoJugador,
  getJugador,
  getJugadoresId,
  getJugadorName,
  obtainRedCards,
  obtainYellowCards,
} from './torneo-utilities';

@Injectable({
  providedIn: 'root',
})
export class TorneoService {
  public clubes: Equipo[] = [];
  public tarjetas: Observable<Tarjetas[]>;
  public goleadores: Observable<Goleador[]>;

  constructor(private service: FirebaseService) {
    /**
     * Obtener clubes
     */
    this.service
      .getPartidos()
      .pipe(
        map((partidos) =>
          this.service
            .getEquipos()
            .pipe(
              map((equipos) =>
                equipos.map((eq) => {
                  let equipo = eq.payload.doc.data();
                  return this.service
                    .getJugadoresDeUnEquipo(eq.payload.doc.data().id)
                    .pipe(
                      map(
                        (x) =>
                          (equipo = {
                            ...equipo,
                            jugadores: x,
                          } as Equipo)
                      ),
                      map((eq) => {
                        const jugadores = [];
                        const jugadoresId = [
                          ...new Set([...getJugadoresId(eq.id, eq.jugadores)]),
                        ];
                        for (let i = 0; i < jugadoresId.length; i++) {
                          let jugadorId = jugadoresId[i];
                          const jugador: Jugador = {
                            ...getJugador(jugadorId, eq.jugadores),
                            goles: getGoleadores(
                              partidos.map((x) => x.payload.doc.data())
                            )[jugadorId],
                            ta: obtainYellowCards(
                              partidos.map((x) => x.payload.doc.data())
                            )[jugadorId],
                            tr: obtainRedCards(
                              partidos.map((x) => x.payload.doc.data())
                            )[jugadorId],
                          };
                          jugadores.push(jugador);
                        }
                        equipo = { ...equipo, jugadores };
                        console.log(equipo);
                        return equipo;
                      })
                    )
                    .subscribe((equipo) => {
                      this.clubes.push(equipo);
                    });
                })
              )
            )
            .subscribe((x) => {})
        )
      )
      .subscribe((x) => {});

    /**
     * Obtener goleadores
     */
    this.goleadores = this.service.getEquipos().pipe(
      switchMap((eq) => {
        const equipos = eq.map((x) => x.payload.doc.data());
        return this.service.getPartidos().pipe(
          switchMap((par) => {
            const partidos = par.map((x) => x.payload.doc.data());
            return this.service.getJugadores().pipe(
              map((ju) => {
                const jugadores = ju.map((x) => x.payload.doc.data());
                const goleadoresId = Object.keys(getGoleadores(partidos));
                let goleador: Goleador = {
                  club: '',
                  jugador: '',
                  imagen: '',
                  goles: 0,
                };

                return goleadoresId.map((x, i) => {
                  let jugadorId = goleadoresId[i];
                  goleador = {
                    jugador: getJugadorName(jugadorId, jugadores),
                    club: getEquipoJugador(jugadorId, equipos, jugadores),
                    imagen: getImagenEquipoJugador(
                      jugadorId,
                      equipos,
                      jugadores
                    ),
                    goles: getGoleadores(partidos)[jugadorId],
                  };
                  return goleador;
                });
              })
            );
          })
        );
      })
    );
    /**
     * Obtener tarjetas
     */
    this.tarjetas = this.service.getEquipos().pipe(
      switchMap((eq) => {
        const equipos = eq.map((x) => x.payload.doc.data());
        return this.service.getPartidos().pipe(
          switchMap((par) => {
            const partidos = par.map((x) => x.payload.doc.data());
            return this.service.getJugadores().pipe(
              map((ju) => {
                const jugadores = ju.map((x) => x.payload.doc.data());
                const jugadoresId = [
                  ...new Set([
                    ...Object.keys(obtainRedCards(partidos)),
                    ...Object.keys(obtainYellowCards(partidos)),
                  ]),
                ];
                return jugadoresId.map((x, i) => {
                  let jugadorId = jugadoresId[i];
                  const jugador: Tarjetas = {
                    jugador: getJugadorName(jugadorId, jugadores),
                    club: getEquipoJugador(jugadorId, equipos, jugadores),
                    imagen: getImagenEquipoJugador(
                      jugadorId,
                      equipos,
                      jugadores
                    ),
                    ta: obtainYellowCards(partidos)[jugadorId] ?? 0,
                    tr: obtainRedCards(partidos)[jugadorId] ?? 0,
                  };
                  return jugador;
                });
              })
            );
          })
        );
      })
    );
  }
}