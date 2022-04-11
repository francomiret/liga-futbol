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
  partidos: string[];
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
  canchaId: string;
  jugadores?: Jugador[];
}
export interface Jugador {
  id: string;
  nombre: string;
  equipoId: string;
  fechaNacimiento?: string;
  imagen?: string;
  posicion?: string;
  goles?: number;
  ta?: number;
  tr?: number;
}

export interface Cancha {
  id: string;
  nombre: string;
  localidad: string;
}
