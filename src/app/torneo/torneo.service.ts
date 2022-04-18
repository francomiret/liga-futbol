import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { map, switchMap, take, tap } from 'rxjs/operators';
import {
  Equipo,
  Fixture,
  Goleador,
  Jugador,
  PartidoFixture,
  Posicion,
  Tarjetas,
} from 'src/models/torneo';
import { FirebaseService } from '../firebase.service';
import {
  esEmpate,
  ganoLocal,
  ganoVisitante,
  getCanchaLocale,
  getClubImage,
  getClubName,
  getDiferenciaDeGol,
  getEquipoJugador,
  getGoleadores,
  getImagenEquipoJugador,
  getJugador,
  getJugadoresId,
  getJugadorName,
  getPartidosByIds,
  getPuntos,
  obtainRedCards,
  obtainYellowCards,
} from './torneo-utilities';

@Injectable({
  providedIn: 'root',
})
export class TorneoService {
  public clubes: Equipo[] = [];
  public tarjetas: Observable<Tarjetas[]>;
  public posiciones: Observable<Posicion[]>;
  public goleadores: Observable<Goleador[]>;
  public fixture: Observable<Fixture[]>;

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
     * Obtener posiciones
     */
    this.posiciones = this.service.getPartidos().pipe(
      switchMap((par) => {
        const partidos = par.map((x) => x.payload.doc.data());
        return this.service.getEquipos().pipe(
          map((eq) => {
            const equipos = eq.map((x) => x.payload.doc.data());
            return equipos.map((equipo) => {
              let posicion: Posicion = {
                equipo: equipo,
                e: 0,
                g: 0,
                p: 0,
                gc: 0,
                gf: 0,
                pj: 0,
                dg: 0,
                puntos: 0,
              };
              const partidosLocal = partidos.filter(
                (x) => x.equipoLocalId === equipo.id && x.jugado === true
              );
              const partidosVisitante = partidos.filter(
                (x) => x.equipoVisitanteId === equipo.id && x.jugado === true
              );

              partidosLocal.forEach((partido) => {
                posicion = {
                  ...posicion,
                  gf: posicion.gf + partido.golesLocalId.length,
                  gc: posicion.gc + partido.golesVisitanteId.length,
                  pj: posicion.pj + 1,
                };
                if (esEmpate(partido)) {
                  posicion = {
                    ...posicion,
                    e: posicion.e + 1,
                  };
                } else if (ganoLocal(partido)) {
                  posicion = {
                    ...posicion,
                    g: posicion.g + 1,
                  };
                } else if (ganoVisitante(partido)) {
                  posicion = {
                    ...posicion,
                    p: posicion.p + 1,
                  };
                }
              });

              partidosVisitante.forEach((partido) => {
                posicion = {
                  ...posicion,
                  gf: posicion.gf + partido.golesVisitanteId.length,
                  gc: posicion.gc + partido.golesLocalId.length,
                  pj: posicion.pj + 1,
                };
                if (esEmpate(partido)) {
                  posicion = {
                    ...posicion,
                    e: posicion.e + 1,
                  };
                } else if (ganoLocal(partido)) {
                  posicion = {
                    ...posicion,
                    p: posicion.p + 1,
                  };
                } else if (ganoVisitante(partido)) {
                  posicion = {
                    ...posicion,
                    g: posicion.g + 1,
                  };
                }
              });
              posicion = {
                ...posicion,
                puntos: getPuntos(posicion),
                dg: getDiferenciaDeGol(posicion),
              };
              return posicion;
            });
          })
        );
      })
    );
    /**
     * Obtener fixture
     */
    this.fixture = this.service.getPartidos().pipe(
      switchMap((par) => {
        const partidos = par.map((x) => x.payload.doc.data());
        return this.service.getEquipos().pipe(
          switchMap((eq) => {
            const equipos = eq.map((x) => x.payload.doc.data());
            return this.service.getCanchas().pipe(
              switchMap((can) => {
                const canchas = can.map((x) => x.payload.doc.data());
                return this.service.getFechas().pipe(
                  map((fe) => {
                    const fechas = fe.map((x) => x.payload.doc.data());
                    let fecha: Fixture;
                    return fechas.map((fech) => {
                      const nuevosPartidos: PartidoFixture[] = [];
                      getPartidosByIds(fech.partidos, partidos).forEach((x) => {
                        nuevosPartidos.push({
                          ...x,
                          imagenLocal:
                            getClubImage(x.equipoLocalId, equipos) ?? '',
                          imagenVisitante:
                            getClubImage(x.equipoVisitanteId, equipos) ?? '',
                          nombreLocal:
                            getClubName(x.equipoLocalId, equipos) ?? '',
                          nombreVisitante:
                            getClubName(x.equipoVisitanteId, equipos) ?? '',
                        } as unknown as PartidoFixture);
                      });
                      fecha = {
                        jugada: fech.jugada,
                        id: parseInt(fech.id),
                        canchaLocalidad:
                          getCanchaLocale(fech.canchaId, canchas) ?? '',
                        clubOrganizadorNombre:
                          getClubName(fech.equipoOrganizadorId, equipos) ?? '',
                        fecha: fech.fecha,
                        partidos: nuevosPartidos,
                      };
                      return fecha;
                    });
                  })
                );
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
