export interface Torneo {
  id: string;
  nombre: string;
  fechas: Fecha[];
}

export interface Fecha {
  id: string;
  jugada: boolean;
  fecha: string;
  equipoOrganizadorId: string;
  canchaId: string;
  partidos: Partido[];
}

export interface Partido {
  id: string;
  horario: string;
  jugado: boolean;
  equipoLocalId: string;
  equipoVisitanteId: string;
  golesLocalId: string[];
  golesVisitanteId: string[];
  amarillasLocalId: string[];
  amarillasVisitanteId: string[];
  rojasLocalId: string[];
  rojasVisitanteId: string[];
}

export interface Equipo {
  id: string;
  nombre: string;
  imagen?: string;
  jugadores: Jugador[];
}
export interface Jugador {
  id: string;
  nombre: string;
  edad?: string;
  imagen?: string;
  posicion?: string;
}

export interface Cancha {
  id: string;
  nombre: string;
  localidad: string;
}
