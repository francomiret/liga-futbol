import {
  Cancha,
  Equipo,
  Fecha,
  Jugador,
  Partido,
  Posicion,
} from 'src/models/torneo';

export function getGoleadores(partidos: Partido[]) {
  const allGoleadores: string[] = [];
  let repetidos: Record<string, number> = {};

  partidos.forEach((partido) => {
    partido.golesLocalId.forEach((jugador) =>
      allGoleadores.push(jugador + '.' + partido.equipoLocalId)
    );
    partido.golesVisitanteId.forEach((jugador) =>
      allGoleadores.push(jugador + '.' + partido.equipoVisitanteId)
    );
  });

  allGoleadores.forEach(function (numero) {
    repetidos[numero] = (repetidos[numero] || 0) + 1;
  });
  return repetidos;
}

export function obtainRedCards(partidos: Partido[]) {
  const allRedCards: string[] = [];
  let repetidos: Record<string, number> = {};

  partidos.forEach((partido) => {
    partido.rojasLocalId.forEach((jugador) =>
      allRedCards.push(jugador.jugadorId + '.' + partido.equipoLocalId)
    );
    partido.rojasVisitanteId.forEach((jugador) =>
      allRedCards.push(jugador.jugadorId + '.' + partido.equipoVisitanteId)
    );
  });
  allRedCards.forEach(function (numero) {
    repetidos[numero] = (repetidos[numero] || 0) + 1;
  });
  return repetidos;
}

export function getJugadorIdFormComplexId(id: string) {
  return id.split('.')[0];
}
export function getEquipoIdFormComplexId(id: string) {
  return id.split('.')[1];
}

export function obtainYellowCards(partidos: Partido[]) {
  const allYellowCards: string[] = [];
  let repetidos: Record<string, number> = {};

  partidos.forEach((partido) => {
    partido.amarillasLocalId.forEach((jugador) =>
      allYellowCards.push(jugador + '.' + partido.equipoLocalId)
    );
    partido.amarillasVisitanteId.forEach((jugador) =>
      allYellowCards.push(jugador + '.' + partido.equipoVisitanteId)
    );
  });
  allYellowCards.forEach(function (numero) {
    repetidos[numero] = (repetidos[numero] || 0) + 1;
  });
  return repetidos;
}

export function getJugadoresId(equipoId: string, jugadores: Jugador[]) {
  return (
    jugadores.filter((x) => x.equipoId === equipoId)?.map((x) => x.id) ?? ''
  );
}

export function getJugador(id: string, jugadores: Jugador[], equipoId: string) {
  return (
    jugadores.find((x) => x.id === id && x.equipoId === equipoId) ??
    jugadores[0]
  );
}

export function getJugadorName(
  id: string,
  jugadores: Jugador[],
  equipoId: string
) {
  return (
    jugadores.find((x) => x.id === id && x.equipoId === equipoId)?.nombre ?? ''
  );
}

export function getEquipoJugador(
  id: string,
  equipos: Equipo[],
  jugadores: Jugador[]
) {
  return (
    equipos.find((x) => x.id === jugadores.find((x) => x.id === id)?.equipoId)
      ?.nombre ?? ''
  );
}

export function getImagenEquipoJugador(
  id: string,
  equipos: Equipo[],
  jugadores: Jugador[]
) {
  return (
    equipos.find((x) => x.id === jugadores.find((x) => x.id === id)?.equipoId)
      ?.imagen ?? ''
  );
}

export const fieldSorter = (fields: any) => (a: any, b: any) =>
  fields
    .map((o: any) => {
      let dir = 1;
      if (o[0] === '-') {
        dir = -1;
        o = o.substring(1);
      }
      return a[o] > b[o] ? dir : a[o] < b[o] ? -dir : 0;
    })
    .reduce((p: any, n: any) => (p ? p : n), 0);

export function esEmpate(partido: Partido) {
  return partido.golesLocalId.length === partido.golesVisitanteId.length;
}

export function ganoLocal(partido: Partido) {
  return partido.golesLocalId.length > partido.golesVisitanteId.length;
}

export function ganoVisitante(partido: Partido) {
  return partido.golesLocalId.length < partido.golesVisitanteId.length;
}

export function getPuntos(tabla: Posicion): number {
  return tabla.g * 3 + tabla.e;
}

export function getDiferenciaDeGol(tabla: Posicion): number {
  return tabla.gf - tabla.gc;
}

export function getClubName(id: string, equipos: Equipo[]) {
  return equipos.find((x) => x.id === id)?.nombre;
}

export function getClubImage(id: string, equipos: Equipo[]) {
  return equipos.find((x) => x.id === id)?.imagen;
}

export function getCanchaLocale(id: string, canchas: Cancha[]) {
  return canchas.find((x) => x.id === id)?.localidad;
}

export function getPartidosByIds(partidosId: string[], partidos: Partido[]) {
  const nuevosPartidos: Partido[] = [];
  partidosId.forEach((partidoId) => {
    const partido = partidos.find((x) => x.id === partidoId);
    if (partido) {
      nuevosPartidos.push(partido);
    }
  });
  return nuevosPartidos;
}

export function getTodosLosJugadores(equipos: Equipo[]) {
  const jugadores: Jugador[] = [];
  equipos.forEach((equipo) => {
    jugadores.push(...equipo.jugadores);
  });
  return jugadores;
}

export function getTodosLosPartidos(fechas: Fecha[]) {
  const partidos: Partido[] = [];
  fechas.forEach((fecha) => {
    partidos.push(...fecha.partidos);
  });
  return partidos;
}
