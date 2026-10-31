export interface Reference {
  lead: string;
  title?: string;
  rest?: string;
  url?: string;
}

const UCSUR = 'Universidad Científica del Sur';
const CURSO = ' [Material del curso Ética y Deontología Profesional, HUM-010].';

const ficha = (year: string, code: string, title: string): Reference => ({
  lead: `${UCSUR}. (${year}).`,
  title: `Ficha de aprendizaje colaborativo ${code}: ${title}`,
  rest: CURSO
});

const sesion = (year: string, n: number, tema: string): Reference => ({
  lead: `${UCSUR}. (${year}).`,
  title: `Sesión ${n}: ${tema}`,
  rest: CURSO
});

export const references: Record<string, Reference[]> = {
  AC1: [
    { lead: 'Aristóteles. (2014).', title: 'Ética a Nicómaco', rest: ' (Libro I). Obra original escrita ca. 349 a. C.' },
    { lead: 'Giusti, M. (2007).', title: 'El sentido de la ética', rest: '.' },
    ficha('2026', 'AC1', 'Mi metáfora artística. ¿Quiénes somos y hacia dónde vamos?')
  ],
  AC2: [
    { lead: 'Beauchamp y Childress. (s. f.).', rest: 'Los cuatro principios de la bioética: autonomía, beneficencia, no maleficencia y justicia [Referidos en la sesión 2 del curso Ética y Deontología Profesional, HUM-010].' },
    { lead: 'Kant, I. (2012).', title: 'Fundamentación de la metafísica de las costumbres', rest: '. Obra original publicada en 1785.' },
    { lead: 'Organización de las Naciones Unidas. (1948).', title: 'Declaración Universal de los Derechos Humanos', rest: '.', url: 'https://www.un.org/es/about-us/universal-declaration-of-human-rights' },
    ficha('2026a', 'AC2', '¿A quién le debemos responsabilidad? Poblaciones vulnerables de nuestra carrera'),
    sesion('2026b', 2, 'Contenidos del curso')
  ],
  AC3: [
    { lead: 'Gaarder, J. (1991).', title: 'El mundo de Sofía', rest: ' [Lectura complementaria].' },
    { lead: 'Scheler, M. (1913–1916).', title: 'El formalismo en la ética y la ética material de los valores', rest: '.' },
    ficha('2026a', 'AC3', '¿Qué valoramos? Nuestra jerarquía de valores'),
    sesion('2026b', 3, 'De la virtud clásica a la libertad contemporánea')
  ],
  AC4: [
    { lead: 'Platón. (s. f.).', title: 'La República', rest: ' (Libro VII) [Lectura complementaria].' },
    { lead: 'Radio Ambulante. (s. f.). Caravana de la desinformación [Episodio de pódcast]. En', title: 'Radio Ambulante', rest: '.' },
    ficha('2026a', 'AC4', 'Mapa de negligencias y acciones positivas en nuestro ámbito profesional'),
    sesion('2026b', 4, 'Verdad lógica vs. verdad ética, falacias y posverdad, y método socrático para la resolución de problemas')
  ]
};

export function referencesFor(code: string): Reference[] { return references[code] ?? []; }
