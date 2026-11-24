import type { ImageMetadata } from 'astro:assets';
import placeholder from '../assets/images/equipo/placeholder.svg';

export interface Member {
  id: string;
  name: string;
  fullName: string;
  code: string;
  career: string;
  bio: string | null;
  linkedin: string | null;
  photo: ImageMetadata;
  hasPhoto: boolean;
  photoPos?: string;
  initials: string;
  song?: { spotify: string; title: string; artist: string; note?: string };
}

export const TEAM_NAME = 'Sinergia Sistémica';
export const CAREER = 'Ingeniería Empresarial y de Sistemas';

export const team: Member[] = [
  { id: 'aisha-cuba', name: 'Aisha Cuba', fullName: 'Aisha Cuba Conchatupa', code: '100191781', career: CAREER, bio: 'Interesada en el diseño de sistemas justos y accesibles.', linkedin: null, photo: placeholder, hasPhoto: false, initials: 'AC', song: { spotify: '5u4hhtZ7f4rWkMZEZcTKrH', title: 'Relax My Eyes', artist: 'ANOTR, Abel Balder' } },
  { id: 'maria-cuya', name: 'María Jesús Cuya', fullName: 'María Jesús Cuya Pajuelo', code: '100187563', career: CAREER, bio: 'Comprometida con el desarrollo tecnológico ético.', linkedin: null, photo: placeholder, hasPhoto: false, initials: 'MC', song: { spotify: '0YxQ5bR8jTvOxG06vEmsq3', title: 'Loco por Volverte a Ver', artist: 'Chili Fernández' } },
  { id: 'mathias-enriquez', name: 'Mathias Enríquez', fullName: 'Mathias Nicolás Enríquez Nuñez', code: '100188122', career: CAREER, bio: 'Me interesa la intersección entre los negocios y el desarrollo de software.', linkedin: null, photo: placeholder, hasPhoto: false, initials: 'ME', song: { spotify: '736PP5LTtREkDgktNmX3Gu', title: 'Superpowers', artist: 'Daniel Caesar' } },
  { id: 'jorge-marcacuzco', name: 'Jorge Marcacuzco', fullName: 'Jorge Fabricio Marcacuzco Paquico', code: '100181814', career: CAREER, bio: 'Enfocado en la optimización de procesos y la ética.', linkedin: null, photo: placeholder, hasPhoto: false, initials: 'JM', song: { spotify: '37Tmv4NnfQeb0ZgUC4fOJj', title: 'Sultans of Swing', artist: 'Dire Straits' } }
];

export const teamShortNames = team.map((m) => m.name);
