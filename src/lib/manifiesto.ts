export const metaphor = {
  title: 'El Faro de La Punta',
  place: 'Callao, Perú',
  tagline: 'De la incertidumbre de los datos… hacia decisiones seguras.',
  description: 'Elegimos el Faro de La Punta (Callao) como símbolo de nuestro equipo porque representa orientación, seguridad y dirección. Es una referencia marítima tradicional del litoral limeño: un punto de luz que guía a las embarcaciones en medio de la oscuridad y las ayuda a llegar a puerto seguro. Lo relacionamos con nuestra carrera porque, como futuros ingenieros, buscamos desarrollar soluciones tecnológicas que ayuden a las personas y a las organizaciones a tomar mejores decisiones en un entorno digital que muchas veces se siente tan incierto como el mar de noche.',
  quote: 'Así como un faro orienta a quienes navegan, nosotros buscamos orientar la tecnología hacia un futuro más seguro, responsable y beneficioso para todos.',
  reference: 'Fotografía: Faro de La Punta, Callao.'
};

export const purposeEssay = [
  'Una carrera que se llama Ingeniería Empresarial y de Sistemas suena a negocios y a tecnología, no a ética. Por eso empezamos por la pregunta incómoda: ¿de dónde nace lo ético en lo que hacemos? El Faro de La Punta nos dio la respuesta. Un faro no existe para iluminarse a sí mismo, sino para que otros lleguen a puerto. Una organización es exactamente eso: personas coordinándose a través de procesos y sistemas. Cada decisión de diseño fija de antemano cómo será tratada una persona que no estuvo en la reunión donde se decidió. Ahí aparece la ética: en el instante en que una decisión técnica se convierte en una decisión sobre alguien.',
  'Aristóteles (2014) lo diría de otra forma: toda práctica tiene un telos, un fin propio que la justifica. Para nuestra carrera, ese fin no es la rentabilidad, sino el bien común alcanzado mediante el ordenamiento y la protección justa de la información. Cuando decimos que nuestro telos es integrar éticamente el negocio y la tecnología, decimos algo preciso: que la eficiencia es un medio y la persona es el fin, nunca al revés. Es la fórmula de Kant (1785/2012), y es también lo que Giusti (2007) llama el sentido de la ética: no un catálogo de normas, sino la pregunta por cómo vivir bien con otros. En nuestro campo esa pregunta se traduce en: ¿para quién funciona este sistema y a quién deja fuera?'
];

export const purpose = {
  team: 'Como futuros profesionales, buscamos utilizar la tecnología de manera ética, responsable y segura. Nuestro objetivo no es solo picar código ni construir sistemas que funcionen: queremos construir guías claras y seguras para que las personas naveguen en el entorno digital. Buscamos alcanzar el telos de nuestra profesión —el bien común— desarrollando el areté desde las aulas, habituándonos a programar con transparencia, ética y responsabilidad social. Así, el faro representa cómo nuestra profesión puede orientar la tecnología hacia un impacto positivo en la sociedad.',
  career: 'Diseñar, optimizar y proteger arquitecturas de información y software que garanticen la toma de decisiones eficiente, justa y segura, promoviendo el desarrollo tecnológico y el bienestar integral de la sociedad peruana.'
};

export const concepts = [
  { greek: 'τέλος', name: 'Telos · finalidad', text: 'El fin último de la Ingeniería de Sistemas Empresarial no es la tecnología por sí misma, sino el bien común alcanzado mediante el ordenamiento y la protección justa de la información. El faro no existe para iluminarse a sí mismo, sino para que otros lleguen a puerto.' },
  { greek: 'ἀρετή', name: 'Areté · excelencia', text: 'La excelencia profesional se construye mediante el hábito ético de escribir software transparente, auditable y libre de sesgos perjudiciales. No se trata de un acto aislado de virtud, sino de una disciplina diaria que se entrena como se entrena un rumbo.' },
  { greek: 'εὐδαιμονία', name: 'Eudaimonía · florecimiento', text: 'El florecimiento profesional y la realización plena se alcanzan cuando el ingeniero pone sus conocimientos técnicos al servicio del bien común, logrando que la tecnología genere un impacto positivo y seguro en la vida de los ciudadanos.' }
];

export interface Vulnerable {
  short: string;
  who: string;
  why: string;
  principle: string;
  note: string;
}

export const vulnerables: Vulnerable[] = [
  { short: 'Zonas con poca conectividad', who: 'Clientes de zonas con poca conectividad que no pueden acceder a promociones, soporte o compras.', why: 'Es usual en el mercado migrar ventas y servicios asumiendo que el cliente tiene internet y dispositivos propios; por ende, quienes viven en zonas lejanas como la sierra o la selva quedan sin el soporte que reciben los usuarios urbanos.', principle: 'Justicia', note: 'Lo cuestionable es que esa decisión no es un error técnico, es una prioridad: es más barato ignorar al usuario rural que adaptar el sistema para él.' },
  { short: 'Personas con discapacidad', who: 'Personas con discapacidad visual o motora que intentan usar apps bancarias, páginas web de trámites o sistemas de atención al cliente sin diseño adecuado.', why: 'Al diseñar o evaluar plataformas de atención al cliente, los sistemas suelen aprobarse pensando en el usuario común, sin lector de pantalla ni navegación por teclado. En el Perú esto es común en la banca y en trámites como los de RENIEC o SUNAT.', principle: 'Autonomía', note: 'Precisamente por la pérdida de control e independencia sobre gestiones que les corresponden: el sistema debería facilitarles el acceso y termina exigiéndoles herramientas que no pueden usar.' },
  { short: 'Microempresarios informales', who: 'Microempresarios informales que deben adoptar plataformas digitales de venta, cobro o facturación electrónica exigidas por ley o por las grandes cadenas.', why: 'No cuentan con conocimiento técnico, capital ni tiempo para implementar estos sistemas, lo que termina en dependencia de terceros que a veces los estafan o configuran mal sus cuentas, o simplemente quedan fuera del mercado formal por no poder cumplir.', principle: 'No maleficencia', note: 'Si un sistema exige algo que la persona no puede cumplir por sí sola, el problema no es del microempresario, es del diseño que no pensó en él.' }
];

export const commitment = 'Como en la metáfora, un faro no pierde sentido por la niebla, sino porque quienes lo construyen dejan de mirar a quién están dejando fuera del puerto. Lo mismo pasa con un sistema: se construye pensando en el usuario ideal, no en el real, y así se termina excluyendo a quien más lo necesita. Por eso nuestro compromiso no es solo escuchar antes de digitalizar, sino aceptar que como equipo también podemos caer en ese mismo error si no cuestionamos nuestras propias suposiciones.';

export const valuesRank = [
  { n: 'I', name: 'Valores espirituales', type: 'Justicia, verdad, responsabilidad y dignidad humana' },
  { n: 'II', name: 'Valores vitales', type: 'Bienestar, salud y calidad de vida' },
  { n: 'III', name: 'Valores económicos', type: 'Rentabilidad, eficiencia y utilidad' },
  { n: 'IV', name: 'Valores de lo agradable', type: 'Comodidad, facilidad de uso y satisfacción inmediata' },
  { n: 'V', name: 'Valores de lo sagrado', type: 'Principios y convicciones morales' }
];

export const tension = 'En nuestra carrera existe una tensión constante entre los valores económicos y los valores espirituales y vitales. Muchas veces las empresas buscan reducir costos, aumentar la rentabilidad y mejorar la eficiencia, pero esto puede generar que se deje de lado la accesibilidad, la privacidad y el bienestar de los usuarios. Un ejemplo peruano ocurre cuando se implementan plataformas digitales pensando solo en usuarios con recursos tecnológicos, excluyendo a personas con poca conectividad o discapacidad. Por ello, consideramos que la eficiencia económica debe ser un medio y no el objetivo final de la ingeniería.';

export const axiologicalPosition = 'Como equipo priorizamos los valores espirituales y vitales sobre los económicos, porque nuestra profesión no debe enfocarse únicamente en generar beneficios financieros, sino en crear soluciones responsables. Un faro solo cumple su función cuando considera a todas las embarcaciones que navegan, no solo a las más grandes o rápidas. Por ello buscamos desarrollar sistemas eficientes, pero siempre respetando la dignidad, inclusión y bienestar de los usuarios.';

export interface Negligence {
  short: string;
  failure: string;
  fallacy: string;
  reasoning: string;
  population: string;
  impact: string;
  action: string;
}

export const negligences: Negligence[] = [
  { short: 'Vulneración y venta de bases de datos', failure: 'Descuidar la ciberseguridad o comercializar datos personales (DNI, teléfonos, correos) a terceros para campañas invasivas o call centers.', fallacy: 'Falacia naturalista', reasoning: '«En el mercado peruano todas las empresas se pasan las bases de datos para prospectar, es la costumbre del negocio y nadie reclama».', population: 'Adultos mayores y usuarios con poca educación digital', impact: 'Son los más expuestos a estafas telefónicas, fraudes bancarios y suplantación de identidad.', action: 'Implementar políticas estrictas de privacidad por diseño, cifrado de datos y cumplir rigurosamente la Ley de Protección de Datos Personales.' },
  { short: 'Interfaces engañosas', failure: 'Diseñar plataformas e-commerce o de banca con cobros automáticos difíciles de cancelar, o trampas visuales para inflar los KPI de venta.', fallacy: 'Apelación a la autoridad', reasoning: '«El gerente de marketing u operaciones pidió subir las conversiones como dé lugar y él manda en los requerimientos del sistema».', population: 'Consumidores vulnerables y familias de bajos ingresos', impact: 'Caen en microdeudas, cobros indebidos de membresías o compras no deseadas por falta de claridad web.', action: 'Diseñar arquitecturas de procesos transparentes (UX ética) donde la cancelación sea tan fácil como la suscripción y los términos de pago sean 100 % claros.' },
  { short: 'Algoritmos sesgados y automatización precarizadora', failure: 'Reestructurar procesos recortando personal vulnerable sin capacitación previa, o usar filtros de contratación automáticos con sesgos de género y procedencia.', fallacy: 'Posverdad y hombre de paja', reasoning: '«Vender la narrativa de que la tecnología es 100 % neutral y quien critique el recorte o el sesgo del algoritmo simplemente está en contra de la innovación y la modernidad».', population: 'Trabajadores operativos, practicantes y postulantes de sectores populares', impact: 'Quedan excluidos del mercado laboral sin una oportunidad justa de reconversión digital.', action: 'Auditar el código y los modelos de datos para eliminar sesgos discriminatorios, y diseñar reingenierías de procesos con enfoque en transición laboral justa y capacitación del personal.' }
];

export const socraticQuestion = '¿Estamos usando la tecnología y la optimización de procesos para crear valor real y mejorar la vida de las personas, o simplemente para automatizar la exclusión, engañar al usuario y maximizar ganancias sin medir el impacto humano?';

export const manifestoClosing = 'Concebimos la ingeniería empresarial y de sistemas como una arquitectura de soluciones al servicio de las personas y no como una herramienta de lucro ciego (AC1). Asumimos la responsabilidad de proteger la privacidad y los derechos de los usuarios y trabajadores más vulnerables en la era digital (AC2), guiados por la integridad, la transparencia y la justicia algorítmica (AC3). Cuestionar las «sombras» de la manipulación de datos y la automatización irresponsable es nuestro compromiso para liderar una transformación digital ética en el Perú (AC4).';
