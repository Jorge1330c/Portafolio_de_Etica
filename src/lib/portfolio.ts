import { team, CAREER } from './team';

export const COURSE = {
  name: 'Ética y Deontología Profesional',
  code: 'HUM-010',
  university: 'Universidad Científica del Sur',
  universityShort: 'UCSUR',
  cycle: '2026-2',
  teacher: 'Pablo Cárdenas Garaycochea',
  portfolioName: 'Brújula Ética'
};

export type Status = 'done' | 'wip' | 'todo';

export interface Section {
  id: string;
  path: string;
  label: string;
  title: string;
  eyebrow: string;
  desc: string;
  status: Status;
  icon: 'users' | 'compass' | 'mic' | 'video' | 'map';
}

export const sections: Section[] = [
  { id: 'equipo', path: 'equipo', label: 'Equipo', title: 'Quiénes somos', eyebrow: 'Sinergia Sistémica · 4 integrantes', desc: `Somos estudiantes de ${CAREER}. Descubre quiénes somos y qué nos motiva.`, status: 'done', icon: 'users' },
  { id: 'manifiesto', path: 'manifiesto', label: 'Manifiesto', title: 'Manifiesto de Identidad Ética', eyebrow: 'Módulo I · Semanas 1–5', desc: 'El Faro de La Punta como metáfora, el propósito profesional, las poblaciones que protegemos, los valores y las fallas de nuestro campo.', status: 'done', icon: 'compass' },
  { id: 'podcast', path: 'podcast', label: 'Podcast', title: 'Podcast de Dilema Moral', eyebrow: 'Módulo II · Semanas 6–7', desc: 'El deber kantiano y el utilitarismo de Mill como criterios para orientar decisiones profesionales desde AC1.', status: 'done', icon: 'mic' },
  { id: 'videoreaccion', path: 'video-reaccion', label: 'Video-reacción', title: 'Video-reacción crítico', eyebrow: 'Módulo III · Semanas 9–12', desc: 'Normas, códigos y responsabilidad: una guía de revisión del podcast vinculada a la excelencia ética de AC1.', status: 'done', icon: 'video' },
  { id: 'infografia', path: 'infografia', label: 'Infografía', title: 'Infografía de Integridad y Sostenibilidad', eyebrow: 'Módulo IV · Semanas 13–15', desc: 'Del faro de AC1 al bien común: cuidado de poblaciones vulnerables y responsabilidad con generaciones futuras.', status: 'done', icon: 'map' }
];

export interface Milestone {
  code: string;
  title: string;
  when: string;
  status: Status;
  href?: string;
  note?: string;
}

export const roadmap: Milestone[] = [
  { code: 'AC1', title: 'Metáfora artística y propósito de la carrera', when: 'Semana 1', status: 'done', href: 'bitacora/ac1-metafora-artistica', note: 'Manifiesto' },
  { code: 'AC2', title: 'Poblaciones vulnerables y compromiso ético', when: 'Semana 2', status: 'done', href: 'bitacora/ac2-poblaciones-vulnerables', note: 'Manifiesto' },
  { code: 'AC3', title: 'Jerarquía de valores y tensión axiológica', when: 'Semana 3', status: 'done', href: 'bitacora/ac3-jerarquia-de-valores', note: 'Manifiesto' },
  { code: 'AC4', title: 'Mapa de negligencias y acciones positivas', when: 'Semana 4', status: 'done', href: 'bitacora/ac4-mapa-de-negligencias', note: 'Manifiesto' },
  { code: 'EC1', title: 'Presentación del Manifiesto de Identidad Ética completo', when: 'Semana 5', status: 'done', href: 'bitacora/ec1-manifiesto', note: '18 % de la nota' },
  { code: 'AC5–AC6', title: 'Guion del podcast (dilema ético profesional)', when: 'Semanas 6–7', status: 'done', href: 'podcast' },
  { code: 'EP', title: 'Evaluación parcial individual', when: 'Semana 8', status: 'done', href: 'bitacora/ep-evaluacion-parcial', note: 'Material de evaluación' },
  { code: 'AC7–AC9', title: 'Video-reacción al podcast', when: 'Semanas 9–11', status: 'done', href: 'video-reaccion' },
  { code: 'EC2', title: 'Video-reacción y sustentación', when: 'Semana 12', status: 'done', href: 'bitacora/ec2-video-reaccion', note: '18 %' },
  { code: 'AC10–AC11', title: 'Infografía de integridad y sostenibilidad', when: 'Semanas 13–14', status: 'done', href: 'infografia', note: 'Texto integrado · imagen propuesta' },
  { code: 'EC3', title: 'Preparación de la sustentación final del portafolio', when: 'Semana 15', status: 'wip', href: 'bitacora/ec3-cierre', note: '19 % · preparación' }
];

export const STATUS_LABEL: Record<Status, string> = { done: 'Listo', wip: 'En construcción', todo: 'Próximamente' };

export function isEnabled(status: Status): boolean { return status !== 'todo'; }

export interface Track {
  spotify: string;
  title: string;
  artist: string;
  memberId: string;
  memberName: string;
  note?: string;
}

export const SOUNDTRACK: Track[] = team.filter((m) => m.song).map((m) => ({
  spotify: m.song!.spotify,
  title: m.song!.title,
  artist: m.song!.artist,
  memberId: m.id,
  memberName: m.name,
  note: m.song!.note
}));

export function progress(): { done: number; total: number; pct: number } {
  const total = roadmap.length;
  const done = roadmap.filter((m) => m.status === 'done').length;
  return { done, total, pct: Math.round((done / total) * 100) };
}
