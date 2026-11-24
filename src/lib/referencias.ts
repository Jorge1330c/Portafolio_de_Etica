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

Object.assign(references, {
  "EC1": [...references.AC1, ...references.AC2, ...references.AC3, ...references.AC4],
  "AC5": [
    {
      "lead": "Kant, I. (1785/2012).",
      "title": "Fundamentación de la metafísica de las costumbres",
      "rest": " (R. R. Aramayo, trad.). Alianza."
    },
    {
      "lead": "Universidad Científica del Sur. (2026).",
      "title": "Sesión 6: Deber moral y autonomía de la voluntad",
      "rest": " [Material del curso HUM-010]."
    }
  ],
  "AC6": [
    {
      "lead": "Bentham, J. (1789/2017).",
      "title": "An introduction to the principles of morals and legislation",
      "rest": " (J. Bennett, ed.). Early Modern Texts."
    },
    {
      "lead": "Mill, J. S. (1863/2014).",
      "title": "El utilitarismo",
      "rest": " (E. Guisán, trad.). Alianza."
    },
    {
      "lead": "Kant, I. (1785/2012).",
      "title": "Fundamentación de la metafísica de las costumbres",
      "rest": ". Alianza."
    },
    {
      "lead": "Universidad Científica del Sur. (2026).",
      "title": "Sesión 7: Utilitarismo y bien común",
      "rest": " [Material del curso HUM-010]."
    }
  ],
  "AC7": [
    {
      "lead": "Hobbes, T. (1651/2018).",
      "title": "Leviatán",
      "rest": ". Deusto."
    },
    {
      "lead": "Locke, J. (1690/2006).",
      "title": "Segundo Tratado sobre el Gobierno Civil",
      "rest": ". Alianza Editorial."
    },
    {
      "lead": "Rousseau, J. J. (1762/1999).",
      "title": "El contrato social",
      "rest": ". Universidad ARCIS."
    },
    {
      "lead": "Universidad Científica del Sur. (2026).",
      "title": "Sesión 9: Contrato social y normas profesionales",
      "rest": " [Material del curso HUM-010]."
    }
  ],
  "AC8": [
    {
      "lead": "Polo, S. (2003).",
      "title": "Ética profesional",
      "rest": ". Gestión en el Tercer Milenio, 6(12), 69–78."
    },
    {
      "lead": "Universidad Científica del Sur. (2026).",
      "title": "Sesión 10: Análisis de los códigos deontológicos",
      "rest": " [Material del curso HUM-010; portada indica ciclo 2026-1]."
    }
  ],
  "AC9": [
    {
      "lead": "Weber, M. (1919).",
      "title": "La política como vocación",
      "rest": ". Edición electrónica."
    },
    {
      "lead": "Jonas, H. (1995).",
      "title": "El principio de responsabilidad",
      "rest": ". Herder."
    },
    {
      "lead": "Universidad Científica del Sur. (2026).",
      "title": "Sesión 11: Convicción, consecuencias y omisión",
      "rest": " [Material del curso HUM-010]."
    }
  ],
  "AC10": [
    {
      "lead": "Levinas, E. (2015).",
      "title": "Ética e infinito",
      "rest": " (F. Stein, trad.). Visor."
    },
    {
      "lead": "Gilligan, C. (2013).",
      "title": "La ética del cuidado",
      "rest": ". Cuadernos de la Fundación Víctor Grífols i Lucas."
    },
    {
      "lead": "Noddings, N. (2013).",
      "title": "Caring: A relational approach to ethics and moral education",
      "rest": " (2.ª ed.). University of California Press."
    },
    {
      "lead": "Universidad Científica del Sur. (2026).",
      "title": "Sesión 13: Ética del cuidado en el ejercicio profesional",
      "rest": " [Material del curso HUM-010]."
    },
    {
      "lead": "Universidad Científica del Sur. (2026).",
      "title": "Ficha de aprendizaje colaborativo AC10",
      "rest": " [Ficha completada por el equipo]."
    }
  ],
  "AC11": [
    {
      "lead": "Jonas, H. (1995).",
      "title": "El principio de responsabilidad: Ensayo de una ética para la civilización tecnológica",
      "rest": ". Herder."
    },
    {
      "lead": "Leff, E. (2002).",
      "title": "Manifiesto por la vida: Por una ética para la sustentabilidad",
      "rest": ". Simposio sobre Ética y Desarrollo Sustentable."
    },
    {
      "lead": "Universidad Científica del Sur. (2026).",
      "title": "Sesión 14: Ecoética y responsabilidad generacional",
      "rest": " [Material del curso HUM-010]."
    },
    {
      "lead": "Universidad Científica del Sur. (2026).",
      "title": "Ficha de aprendizaje colaborativo AC11",
      "rest": " [Ficha completada por el equipo]."
    }
  ],
  "EP": [
    {
      "lead": "Universidad Científica del Sur. (2026).",
      "title": "Sesión 8: Evaluación individual",
      "rest": " [Material del curso HUM-010]."
    }
  ],
  "EC2": [
    {
      "lead": "Universidad Científica del Sur. (2026).",
      "title": "Sesión 12: Sustentación del análisis profesional",
      "rest": " [Material del curso HUM-010]."
    }
  ],
  "EC3": [
    {
      "lead": "Universidad Científica del Sur. (2026).",
      "title": "Sesión 15: Sustentación del portafolio digital",
      "rest": " [Material del curso HUM-010]."
    }
  ]
});

export function referencesFor(code: string): Reference[] { return references[code] ?? []; }
