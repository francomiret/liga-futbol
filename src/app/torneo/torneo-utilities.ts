import { Equipo, Jugador, Partido, Posicion } from 'src/models/torneo';

export function getGoleadores(partidos: Partido[]) {
  const allGoleadores: string[] = [];
  let repetidos: Record<string, number> = {};

  partidos.forEach((partido) => {
    allGoleadores.push(...partido.golesLocalId);
    allGoleadores.push(...partido.golesVisitanteId);
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
    allRedCards.push(...partido.rojasLocalId);
    allRedCards.push(...partido.rojasVisitanteId);
  });
  allRedCards.forEach(function (numero) {
    repetidos[numero] = (repetidos[numero] || 0) + 1;
  });
  return repetidos;
}

export function obtainYellowCards(partidos: Partido[]) {
  const allYellowCards: string[] = [];
  let repetidos: Record<string, number> = {};

  partidos.forEach((partido) => {
    allYellowCards.push(...partido.amarillasLocalId);
    allYellowCards.push(...partido.amarillasVisitanteId);
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

export function getJugador(id: string, jugadores: Jugador[]) {
  return jugadores.find((x) => x.id === id) ?? jugadores[0];
}

export function getJugadorName(id: string, jugadores: Jugador[]) {
  return jugadores.find((x) => x.id === id)?.nombre ?? '';
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
