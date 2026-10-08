import type { Locale } from "@/lib/translations"
import type { ClimatePageKey } from "@/lib/site"

export type { ClimatePageKey }

type Fact = { term: string; detail: string }
type Card = { title: string; text: string; points: string[] }
type Faq = { question: string; answer: string }
type Section = { id: string; heading: string; paragraphs: string[] }
type Row = { topic: string; mrv: string; me: string }

export type ClimatePageCopy = {
  seoTitle: string
  description: string
  keywords: string[]
  eyebrow: string
  title: string
  lede: string
  definitionLabel: string
  definition: string
  sections: Section[]
  cardsTitle: string
  cards: Card[]
  factsTitle: string
  facts: Fact[]
  faqs: Faq[]
}

export type ClimateCopy = {
  breadcrumbLabel: string
  home: string
  readMore: string
  related: string
  faq: string
  comparison: string
  comparisonCaption: string
  disclaimer: string
  ctaTitle: string
  ctaBody: string
  ctaLabel: string
  status: string
  columnTopic: string
  rows: Row[]
  hub: ClimatePageCopy
  mrv: ClimatePageCopy
  me: ClimatePageCopy
}

const climateContent: Record<Locale, ClimateCopy> = {
  es: {
    breadcrumbLabel: "Ruta de navegación",
    home: "Inicio",
    readMore: "Leer el módulo",
    related: "También en esta línea de trabajo",
    faq: "Preguntas frecuentes",
    comparison: "MRV y M&E, en una lectura",
    comparisonCaption: "Comparación entre monitoreo, reporte y verificación y monitoreo y evaluación climática.",
    disclaimer: "Esta página describe el trabajo de implementación de GearsMap. No es una publicación oficial del Ministerio de Minas y Energía, no implica un aval institucional y no da acceso al sistema. No se publican datos operativos, infraestructura interna ni información contractual reservada.",
    ctaTitle: "¿Su organización tiene datos territoriales que aún no puede usar?",
    ctaBody: "El mismo oficio —fuentes, geometría, indicadores y una interfaz para el equipo— sirve para clima, operación o territorio. Cuéntenos la pregunta difícil.",
    ctaLabel: "Conversemos sobre un sistema",
    status: "Implementación operativa",
    columnTopic: "Pregunta",
    rows: [
      { topic: "Qué responde", mrv: "Cuánto se emite y cómo se mueven los indicadores de mitigación.", me: "Dónde está el riesgo climático y cómo cambia frente a la línea base." },
      { topic: "Objeto", mrv: "Inventario sectorial de GEI e indicadores de mitigación.", me: "Amenaza, vulnerabilidad, riesgo y acciones de adaptación." },
      { topic: "Método", mrv: "Enfoque IPCC 2006: dato de actividad, factor de emisión y potencial de calentamiento.", me: "IPCC AR6: riesgo = amenaza × vulnerabilidad." },
      { topic: "Territorio", mrv: "Lectura departamental y por línea del sector.", me: "Lectura municipal, por cuenca y sobre infraestructura." },
    ],
    hub: {
      seoTitle: "Sistemas MRV y M&E del sector minero-energético",
      description: "Implementación operativa de MRV y de monitoreo y evaluación climática para el sector minero-energético, con el Ministerio de Minas y Energía y apoyo de KfW.",
      keywords: ["MRV", "M&E", "monitoreo reporte y verificación", "monitoreo y evaluación", "sistema de información climática", "sector minero-energético", "Ministerio de Minas y Energía", "MinEnergía", "GEI", "riesgo climático", "PIGCCme", "KfW", "GearsMap", "Colombia"],
      eyebrow: "Trabajo complementario · MinEnergía",
      title: "Sistemas de información climática para decidir sobre el territorio",
      lede: "GearsMap acompañó la implementación operativa de los módulos de monitoreo y evaluación (M&E) y de monitoreo, reporte y verificación (MRV) del sistema de información climática del sector minero-energético. El trabajo se hizo con el Ministerio de Minas y Energía y con apoyo de KfW.",
      definitionLabel: "En una frase",
      definition: "Un sistema de información climática del sector reúne inventario de gases de efecto invernadero, indicadores de mitigación y la lectura territorial de amenaza, vulnerabilidad y riesgo, para que un equipo técnico pueda consultar, comparar y reportar.",
      sections: [
        {
          id: "alcance",
          heading: "Qué se implementó",
          paragraphs: [
            "El encargo fue operativo: pasar de insumos, metodologías y fichas dispersas a módulos que un equipo puede navegar. GearsMap se concentró en los módulos M&E y MRV del sistema de información climática del Ministerio de Minas y Energía, no en reemplazar los estudios de base ni en publicar un portal propio.",
            "La contraparte técnica está en el sector minero-energético colombiano. El marco de política es el Plan Integral de Gestión del Cambio Climático del sector (PIGCCme) y las contribuciones determinadas a nivel nacional (NDC). KfW apoyó esta línea de implementación.",
          ],
        },
        {
          id: "complemento",
          heading: "Cómo se complementa con el resto de GearsMap",
          paragraphs: [
            "GearsMap diseña plataformas geoespaciales, geovisores, tableros e inteligencia artificial para datos que no caben en una hoja de cálculo. El trabajo climático usa el mismo oficio: ordenar fuentes, conservar la geometría, explicar el indicador y dejar una interfaz que el equipo hereda.",
            "Por eso esta línea no sustituye el portafolio. Lo extiende a mitigación, adaptación y transparencia climática, junto a visores regionales, análisis territorial y operación.",
          ],
        },
      ],
      cardsTitle: "Dos módulos, una plataforma",
      cards: [
        {
          title: "MRV · Monitoreo, reporte y verificación",
          text: "Organiza el inventario sectorial de emisiones y el seguimiento de indicadores de mitigación, con fórmula, serie y trazabilidad.",
          points: ["Inventario de GEI con enfoque IPCC 2006", "Indicadores del PIGCCme 2050 por línea estratégica", "Tableros de emisiones y visor departamental"],
        },
        {
          title: "M&E · Monitoreo y evaluación",
          text: "Lee amenaza, vulnerabilidad y riesgo sobre municipios, cuencas e infraestructura, y compara escenarios contra una línea base.",
          points: ["Riesgo = amenaza × vulnerabilidad, IPCC AR6", "Escenarios CMIP6 hasta finales de siglo", "Visor territorial y visor de infraestructura energética"],
        },
      ],
      factsTitle: "Marcos que usa el trabajo",
      facts: [
        { term: "IPCC 2006", detail: "Enfoque de estimación del inventario: dato de actividad, factor de emisión y potencial de calentamiento global." },
        { term: "IPCC AR6", detail: "Marco de riesgo climático usado en monitoreo y evaluación: riesgo = amenaza × vulnerabilidad." },
        { term: "CMIP6", detail: "Escenarios de referencia 1990-2021 y proyecciones SSP2-4.5 y SSP3-7.0." },
        { term: "PIGCCme 2050", detail: "Plan del sector y catálogo de indicadores de mitigación que el módulo MRV organiza para consulta." },
        { term: "NDC", detail: "Contribuciones determinadas de Colombia. El sistema apoya el seguimiento sectorial; no las sustituye." },
      ],
      faqs: [
        {
          question: "¿Qué es un sistema MRV en el sector minero-energético?",
          answer: "Es el arreglo de datos, cálculos y reportes para monitorear, reportar y verificar emisiones de gases de efecto invernadero e indicadores de mitigación del sector. En este trabajo, el módulo MRV organiza el inventario sectorial y el catálogo de indicadores del PIGCCme 2050.",
        },
        {
          question: "¿Qué es el monitoreo y evaluación del riesgo climático?",
          answer: "Es la lectura periódica de amenaza, vulnerabilidad y riesgo sobre el territorio y sobre las actividades del sector. El módulo M&E usa el marco IPCC AR6 y compara escenarios climáticos contra una línea base.",
        },
        {
          question: "¿En qué se diferencian MRV y M&E?",
          answer: "MRV responde cuánto se emite y cómo avanzan los indicadores de mitigación. M&E responde dónde está el riesgo climático y cómo cambia. Los dos módulos conviven en el mismo sistema de información climática, pero no miden lo mismo.",
        },
        {
          question: "¿Este trabajo reemplaza los geovisores de GearsMap?",
          answer: "No. Es complementario. GearsMap sigue diseñando geovisores, tableros, automatización e inteligencia artificial. Los módulos climáticos aplican esa práctica a mitigación y adaptación del sector minero-energético.",
        },
        {
          question: "¿Puedo consultar aquí el sistema del Ministerio?",
          answer: "No. Esta página no da acceso al sistema institucional ni publica sus datos operativos. Describe el trabajo de implementación. Los canales oficiales del Ministerio de Minas y Energía son la vía para información institucional.",
        },
        {
          question: "¿GearsMap puede construir un sistema parecido para otra organización?",
          answer: "Sí, cuando hay una pregunta territorial clara, fuentes identificables y un equipo que necesita usar el resultado. El punto de partida es una conversación, no un paquete cerrado.",
        },
      ],
    },
    mrv: {
      seoTitle: "Sistema MRV de emisiones GEI minero-energéticas",
      description: "Sistema MRV del sector minero-energético: inventario de GEI, indicadores del PIGCCme 2050 y tableros. Implementado con MinEnergía y apoyo de KfW.",
      keywords: ["MRV", "monitoreo reporte y verificación", "inventario de GEI", "gases de efecto invernadero", "INGEI", "emisiones fugitivas", "PIGCCme 2050", "IPCC 2006", "transparencia climática", "sector minero-energético", "descarbonización", "GearsMap"],
      eyebrow: "MRV · Mitigación",
      title: "MRV: monitoreo, reporte y verificación de emisiones del sector minero-energético",
      lede: "El módulo MRV ordena el inventario sectorial de gases de efecto invernadero y el seguimiento de indicadores de mitigación, para que un equipo técnico pueda revisar la serie, la fórmula y el territorio sin reconstruir el cálculo desde cero.",
      definitionLabel: "Definición",
      definition: "MRV significa monitoreo, reporte y verificación. En el sector minero-energético sirve para seguir emisiones e indicadores de mitigación con una pista clara de datos, factores y resultados.",
      sections: [
        {
          id: "organiza",
          heading: "Qué organiza",
          paragraphs: [
            "El inventario sectorial estima emisiones con el enfoque del IPCC 2006: dato de actividad, factor de emisión y potencial de calentamiento global. La lectura puede abrirse por gas, combustible, categoría, departamento y año, sin convertir el inventario nacional en un archivo plano.",
            "Al lado del inventario está el catálogo de indicadores del PIGCCme 2050. Son los indicadores de mitigación del sector, agrupados por líneas de generación, gestión de la demanda, eficiencia, sustitución, emisiones fugitivas, emisiones y seguimiento. Cada indicador conserva fórmula, parámetros, dependencias y serie.",
          ],
        },
        {
          id: "consulta",
          heading: "Qué puede consultar un equipo",
          paragraphs: [
            "El módulo deja tableros de emisiones e intensidad, la ficha del indicador y un visor geográfico de lectura departamental. La ingesta combina conectores a fuentes públicas del sector, carga manual auditada y derivación de indicadores que dependen de otros. XM, UPME, IPSE, la Superintendencia de Servicios Públicos, la ANH y sistemas como RENARE aparecen como fuentes del sector, no como integraciones que esta página documente por dentro.",
            "La trazabilidad importa más que el gráfico. Un resultado tiene que poder volver a su lote, a su factor y a su fórmula. Eso es lo que vuelve usable un inventario cuando cambia el año o se corrige una fuente.",
          ],
        },
        {
          id: "limite",
          heading: "Qué no es",
          paragraphs: [
            "No es el inventario nacional de gases de efecto invernadero, ni una calculadora pública, ni un aval de cifras. Es la implementación operativa del módulo sectorial para los equipos que gestionan mitigación en el sistema de información climática. Las cifras oficiales siguen perteneciendo a sus fuentes y a los canales institucionales.",
          ],
        },
      ],
      cardsTitle: "Piezas del módulo",
      cards: [
        { title: "Inventario sectorial", text: "Emisiones estimadas con dato de actividad, factor y potencial de calentamiento, abiertas por las dimensiones que el equipo ya usa.", points: ["Gas, combustible y categoría", "Departamento y año", "Intensidad y factores aplicados"] },
        { title: "Ficha de indicador", text: "El catálogo del PIGCCme 2050 deja de ser una colección de archivos y pasa a una ficha consultable.", points: ["Fórmula y parámetros", "Dependencias entre indicadores", "Serie temporal y desglose"] },
        { title: "Ingesta con rastro", text: "Los datos entran por más de una puerta, pero no se mezclan sin registro.", points: ["Conectores a fuentes del sector", "Carga manual auditada", "Indicadores derivados"] },
      ],
      factsTitle: "Términos del módulo",
      facts: [
        { term: "GEI", detail: "Gases de efecto invernadero. El inventario sectorial los estima; no los declara como cifra nacional." },
        { term: "IPCC 2006", detail: "Directrices usadas como enfoque de cálculo: actividad × factor de emisión × potencial de calentamiento." },
        { term: "Emisiones fugitivas", detail: "Línea propia del catálogo, relevante para hidrocarburos y para el seguimiento de metano. No se publica aquí un inventario de fugas." },
        { term: "Transparencia", detail: "Poder explicar de dónde salió un número, no solo mostrarlo en un tablero." },
      ],
      faqs: [
        {
          question: "¿Qué significa MRV?",
          answer: "Monitoreo, reporte y verificación. Es la práctica de medir emisiones o indicadores, reportarlos con método y dejar una verificación posible. En este trabajo se aplica al sector minero-energético de Colombia.",
        },
        {
          question: "¿El MRV de GearsMap es el inventario nacional de GEI?",
          answer: "No. El módulo organiza un inventario sectorial para la gestión climática del Ministerio de Minas y Energía. El inventario nacional tiene su propio responsable institucional.",
        },
        {
          question: "¿Qué indicadores cubre?",
          answer: "El catálogo de indicadores de mitigación del PIGCCme 2050, organizado por generación, demanda, eficiencia, sustitución, emisiones fugitivas, emisiones y seguimiento.",
        },
        {
          question: "¿Se pueden ver aquí las emisiones?",
          answer: "No. Esta página explica el trabajo. No publica series, factores ni tableros del sistema institucional.",
        },
      ],
    },
    me: {
      seoTitle: "Monitoreo y evaluación del riesgo climático",
      description: "M&E de amenaza, vulnerabilidad y riesgo climático del sector minero-energético: escenarios CMIP6, lectura municipal y visores. Con MinEnergía y KfW.",
      keywords: ["monitoreo y evaluación", "M&E", "riesgo climático", "vulnerabilidad climática", "amenaza climática", "adaptación al cambio climático", "CMIP6", "IPCC AR6", "SSP2-4.5", "geovisor climático", "sector minero-energético", "GearsMap"],
      eyebrow: "M&E · Adaptación",
      title: "Monitoreo y evaluación de amenaza, vulnerabilidad y riesgo",
      lede: "El módulo M&E pone el riesgo climático sobre el mapa del país y sobre la infraestructura del sector, para comparar una línea base con escenarios futuros y no dejar el análisis en un informe que nadie vuelve a abrir.",
      definitionLabel: "Definición",
      definition: "Monitoreo y evaluación climática, en este trabajo, es la lectura repetible de amenaza, vulnerabilidad y riesgo —territorial y sectorial— y el seguimiento de cómo esas condiciones cambian frente a una línea base.",
      sections: [
        {
          id: "pregunta",
          heading: "La pregunta que responde",
          paragraphs: [
            "No basta con saber que el clima cambia. Un equipo del sector necesita saber dónde la amenaza se cruza con una vulnerabilidad concreta, y si esa condición empeora o mejora respecto del período de referencia. El módulo traduce esa pregunta a mapas, tableros y deltas.",
            "El marco es el del IPCC AR6: riesgo = amenaza × vulnerabilidad. La vulnerabilidad se lee por componentes —ecosistemas, agricultura y seguridad alimentaria, hábitat humano, recurso hídrico, riesgo de desastres, infraestructura, salud y energía— para no esconder una debilidad detrás de un promedio.",
          ],
        },
        {
          id: "territorio",
          heading: "Territorio, cuencas e infraestructura",
          paragraphs: [
            "La lectura territorial cubre los 1.121 municipios del país y las cuencas usadas en el análisis. Los escenarios vienen de CMIP6: el período de referencia 1990-2021 y las proyecciones SSP2-4.5 y SSP3-7.0 en horizontes hasta finales de siglo. El cambio se expresa como delta absoluto y porcentual frente a la línea base.",
            "El visor sectorial lleva la misma lógica a la infraestructura minero-energética: hidrocarburos, minería, generación —hidráulica, térmica, eólica, solar y zonas no interconectadas— y redes. Así el riesgo no se queda en el municipio abstracto: se puede leer sobre la actividad.",
            "Junto a los visores hay tableros por escenario y período, comparación de variables climáticas y un registro estructurado para documentar acciones de adaptación: tipo, sector, territorio, período e indicador. La página no presenta ese registro como un trámite público.",
          ],
        },
        {
          id: "limite",
          heading: "Qué no es",
          paragraphs: [
            "No es un pronóstico operativo del tiempo, ni una certificación de riesgo para un proyecto, ni una publicación oficial de escenarios. Es la implementación del módulo de monitoreo y evaluación dentro del sistema de información climática del sector. Las decisiones de adaptación siguen siendo del equipo que usa la evidencia.",
          ],
        },
      ],
      cardsTitle: "Piezas del módulo",
      cards: [
        { title: "Visor territorial", text: "Mapa municipal de amenaza, sensibilidad, capacidad adaptativa, vulnerabilidad y riesgo, con comparación contra la línea base.", points: ["Municipio y cuenca", "Filtro por componente y escenario", "Descarga con contexto geográfico"] },
        { title: "Escenarios", text: "La referencia 1990-2021 se compara con SSP2-4.5 y SSP3-7.0, no se presenta como un único futuro.", points: ["CMIP6 / IPCC AR6", "Horizontes hasta 2100", "Deltas absolutos y porcentuales"] },
        { title: "Lectura sectorial", text: "La amenaza climática se observa sobre la cadena minero-energética, no solo sobre la división político-administrativa.", points: ["Hidrocarburos y minería", "Generación y redes", "Zonas no interconectadas"] },
      ],
      factsTitle: "Términos del módulo",
      facts: [
        { term: "Amenaza", detail: "La condición climática que puede afectar un lugar o una actividad. No es, por sí sola, el riesgo." },
        { term: "Vulnerabilidad", detail: "Sensibilidad y capacidad adaptativa. Se agrega por componentes para que el promedio no borre el problema." },
        { term: "Riesgo", detail: "Amenaza × vulnerabilidad, según el marco IPCC AR6 usado en el módulo." },
        { term: "Delta", detail: "Cambio absoluto o porcentual de un indicador frente al período de referencia 1990-2021." },
        { term: "EPSG:9377", detail: "Marco de referencia oficial de Colombia (MAGNA-SIRGAS 2018) sobre el que se trabaja la información geográfica." },
      ],
      faqs: [
        {
          question: "¿Qué es M&E en cambio climático?",
          answer: "Monitoreo y evaluación. Aquí significa seguir amenaza, vulnerabilidad y riesgo climático, y poder comparar un escenario con la línea base, no solo publicar un mapa estático.",
        },
        {
          question: "¿Qué escenarios usa el módulo?",
          answer: "El marco CMIP6 del IPCC AR6: referencia 1990-2021 y proyecciones SSP2-4.5 y SSP3-7.0 en horizontes hasta finales de siglo.",
        },
        {
          question: "¿Cubre todo el país?",
          answer: "La lectura territorial está construida sobre los 1.121 municipios de Colombia y sobre las cuencas del análisis. También hay una lectura sobre infraestructura del sector minero-energético.",
        },
        {
          question: "¿GearsMap certifica el riesgo de un proyecto?",
          answer: "No. El módulo organiza evidencia para equipos técnicos. No sustituye un estudio de riesgo de un proyecto ni una decisión oficial de adaptación.",
        },
      ],
    },
  },
  en: {
    breadcrumbLabel: "Breadcrumb",
    home: "Home",
    readMore: "Read the module",
    related: "Also in this line of work",
    faq: "Frequently asked questions",
    comparison: "MRV and M&E, side by side",
    comparisonCaption: "Comparison of monitoring, reporting and verification with climate monitoring and evaluation.",
    disclaimer: "This page describes GearsMap's implementation work. It is not an official publication of the Ministry of Mines and Energy, it does not imply institutional endorsement, and it does not provide access to the system. Operational data, internal infrastructure, and reserved contract information are not published.",
    ctaTitle: "Does your organization have territorial data it still cannot use?",
    ctaBody: "The same craft — sources, geometry, indicators, and an interface a team can inherit — applies to climate, operations, or territory. Tell us the hard question.",
    ctaLabel: "Talk about a system",
    status: "Operational implementation",
    columnTopic: "Question",
    rows: [
      { topic: "What it answers", mrv: "How much is emitted, and how mitigation indicators move.", me: "Where climate risk sits, and how it changes against the baseline." },
      { topic: "Object", mrv: "Sectoral GHG inventory and mitigation indicators.", me: "Hazard, vulnerability, risk, and adaptation actions." },
      { topic: "Method", mrv: "IPCC 2006 approach: activity data, emission factor, and global warming potential.", me: "IPCC AR6: risk = hazard × vulnerability." },
      { topic: "Territory", mrv: "Departmental reading and sector lines.", me: "Municipal, basin, and infrastructure reading." },
    ],
    hub: {
      seoTitle: "Climate MRV and M&E systems for mining & energy",
      description: "MRV and climate monitoring and evaluation for the mining and energy sector, with Colombia's Ministry of Mines and Energy and KfW support.",
      keywords: ["MRV", "M&E", "monitoring reporting and verification", "monitoring and evaluation", "climate information system", "mining and energy sector", "Ministry of Mines and Energy", "GHG inventory", "climate risk", "Colombia", "KfW", "GearsMap"],
      eyebrow: "Complementary work · Ministry of Mines and Energy",
      title: "Climate information systems for territorial decisions",
      lede: "GearsMap supported the operational implementation of the monitoring and evaluation (M&E) and monitoring, reporting and verification (MRV) modules of the mining and energy sector's climate information system. The work was done with Colombia's Ministry of Mines and Energy and with support from KfW.",
      definitionLabel: "In one sentence",
      definition: "A sector climate information system brings together a greenhouse-gas inventory, mitigation indicators, and a territorial reading of hazard, vulnerability, and risk, so a technical team can query, compare, and report.",
      sections: [
        {
          id: "scope",
          heading: "What was implemented",
          paragraphs: [
            "The assignment was operational: move from scattered inputs, methods, and indicator sheets to modules a team can navigate. GearsMap focused on the M&E and MRV modules of the Ministry of Mines and Energy's climate information system. It did not replace the underlying studies, and this website does not launch a public portal.",
            "The technical counterpart is Colombia's mining and energy sector. The policy frame is the sector's Comprehensive Climate Change Management Plan (PIGCCme) and Colombia's nationally determined contributions (NDCs). KfW supported this implementation line.",
          ],
        },
        {
          id: "complement",
          heading: "How this complements the rest of GearsMap",
          paragraphs: [
            "GearsMap designs geospatial platforms, geoviewers, dashboards, and artificial-intelligence tools for data that does not fit a spreadsheet. The climate work uses the same craft: order the sources, keep the geometry, explain the indicator, and leave an interface the team can inherit.",
            "This line does not replace the portfolio. It extends it into mitigation, adaptation, and climate transparency, alongside regional viewers, territorial analysis, and operations.",
          ],
        },
      ],
      cardsTitle: "Two modules, one platform",
      cards: [
        {
          title: "MRV · Monitoring, reporting and verification",
          text: "Organizes the sectoral emissions inventory and mitigation-indicator tracking, with formula, series, and traceability.",
          points: ["GHG inventory using the IPCC 2006 approach", "PIGCCme 2050 indicators by strategic line", "Emissions dashboards and a departmental viewer"],
        },
        {
          title: "M&E · Monitoring and evaluation",
          text: "Reads hazard, vulnerability, and risk over municipalities, basins, and infrastructure, and compares scenarios with a baseline.",
          points: ["Risk = hazard × vulnerability, IPCC AR6", "CMIP6 scenarios through the end of the century", "Territorial viewer and energy-infrastructure viewer"],
        },
      ],
      factsTitle: "Frameworks used in the work",
      facts: [
        { term: "IPCC 2006", detail: "Inventory estimation approach: activity data, emission factor, and global warming potential." },
        { term: "IPCC AR6", detail: "Climate-risk framework used in monitoring and evaluation: risk = hazard × vulnerability." },
        { term: "CMIP6", detail: "1990–2021 reference period and SSP2-4.5 and SSP3-7.0 projections." },
        { term: "PIGCCme 2050", detail: "Sector plan and mitigation-indicator catalog organized by the MRV module for consultation." },
        { term: "NDCs", detail: "Colombia's nationally determined contributions. The system supports sectoral tracking; it does not replace them." },
      ],
      faqs: [
        {
          question: "What is an MRV system in the mining and energy sector?",
          answer: "It is the arrangement of data, calculations, and reports used to monitor, report, and verify greenhouse-gas emissions and mitigation indicators. In this work, the MRV module organizes the sectoral inventory and the PIGCCme 2050 indicator catalog.",
        },
        {
          question: "What is monitoring and evaluation of climate risk?",
          answer: "It is the periodic reading of hazard, vulnerability, and risk over territory and over sector activities. The M&E module uses the IPCC AR6 framework and compares climate scenarios with a baseline.",
        },
        {
          question: "How are MRV and M&E different?",
          answer: "MRV answers how much is emitted and how mitigation indicators move. M&E answers where climate risk is and how it changes. Both modules live in the same climate information system, but they do not measure the same thing.",
        },
        {
          question: "Does this work replace GearsMap geoviewers?",
          answer: "No. It is complementary. GearsMap still designs geoviewers, dashboards, automation, and artificial intelligence. The climate modules apply that practice to mitigation and adaptation in the mining and energy sector.",
        },
        {
          question: "Can I consult the Ministry system here?",
          answer: "No. This page does not grant access to the institutional system and does not publish its operational data. It describes the implementation work. Official Ministry of Mines and Energy channels are the route for institutional information.",
        },
        {
          question: "Can GearsMap build a similar system for another organization?",
          answer: "Yes, when there is a clear territorial question, identifiable sources, and a team that needs to use the result. The starting point is a conversation, not a closed package.",
        },
      ],
    },
    mrv: {
      seoTitle: "GHG emissions MRV system for mining & energy",
      description: "Mining and energy MRV: GHG inventory, PIGCCme 2050 indicators, traceability, and dashboards, with Colombia's Ministry of Mines and Energy and KfW support.",
      keywords: ["MRV", "monitoring reporting and verification", "GHG inventory", "greenhouse gas emissions", "fugitive emissions", "PIGCCme 2050", "IPCC 2006", "climate transparency", "mining and energy", "decarbonization", "GearsMap", "Colombia"],
      eyebrow: "MRV · Mitigation",
      title: "MRV: monitoring, reporting and verification of mining and energy emissions",
      lede: "The MRV module organizes the sectoral greenhouse-gas inventory and mitigation-indicator tracking, so a technical team can review the series, the formula, and the territory without rebuilding the calculation from scratch.",
      definitionLabel: "Definition",
      definition: "MRV means monitoring, reporting and verification. In the mining and energy sector it is how emissions and mitigation indicators are followed with a clear trail of data, factors, and results.",
      sections: [
        {
          id: "organizes",
          heading: "What it organizes",
          paragraphs: [
            "The sectoral inventory estimates emissions with the IPCC 2006 approach: activity data, emission factor, and global warming potential. The reading can open by gas, fuel, category, department, and year, without flattening a national inventory into a single file.",
            "Beside the inventory sits the PIGCCme 2050 indicator catalog: the sector's mitigation indicators, grouped by generation, demand management, efficiency, substitution, fugitive emissions, emissions, and tracking. Each indicator keeps its formula, parameters, dependencies, and series.",
          ],
        },
        {
          id: "consult",
          heading: "What a team can consult",
          paragraphs: [
            "The module provides emissions and intensity dashboards, the indicator sheet, and a departmental geographic viewer. Intake combines connectors to public sector sources, audited manual upload, and derivation of indicators that depend on others. XM, UPME, IPSE, the public-utilities superintendency, the ANH, and systems such as RENARE are sector sources. This page does not document those connections from the inside.",
            "Traceability matters more than the chart. A result has to be able to return to its batch, its factor, and its formula. That is what makes an inventory usable when the year changes or a source is corrected.",
          ],
        },
        {
          id: "limit",
          heading: "What it is not",
          paragraphs: [
            "It is not the national greenhouse-gas inventory, a public calculator, or an endorsement of figures. It is the operational implementation of the sectoral module for teams managing mitigation inside the climate information system. Official figures remain with their sources and institutional channels.",
          ],
        },
      ],
      cardsTitle: "Parts of the module",
      cards: [
        { title: "Sectoral inventory", text: "Emissions estimated from activity data, factors, and warming potential, opened along the dimensions the team already uses.", points: ["Gas, fuel, and category", "Department and year", "Intensity and applied factors"] },
        { title: "Indicator sheet", text: "The PIGCCme 2050 catalog stops being a pile of files and becomes a sheet a team can query.", points: ["Formula and parameters", "Dependencies between indicators", "Time series and breakdown"] },
        { title: "Intake with a trail", text: "Data enters through more than one door, and it is not mixed without a record.", points: ["Connectors to sector sources", "Audited manual upload", "Derived indicators"] },
      ],
      factsTitle: "Terms in the module",
      facts: [
        { term: "GHG", detail: "Greenhouse gases. The sectoral inventory estimates them; it does not declare them as the national figure." },
        { term: "IPCC 2006", detail: "Guidelines used as the calculation approach: activity × emission factor × warming potential." },
        { term: "Fugitive emissions", detail: "A catalog line of its own, relevant to hydrocarbons and methane tracking. This page does not publish a leak inventory." },
        { term: "Transparency", detail: "Being able to explain where a number came from, not only to show it on a dashboard." },
      ],
      faqs: [
        {
          question: "What does MRV mean?",
          answer: "Monitoring, reporting and verification. It is the practice of measuring emissions or indicators, reporting them with a method, and leaving verification possible. In this work it applies to Colombia's mining and energy sector.",
        },
        {
          question: "Is GearsMap's MRV the national GHG inventory?",
          answer: "No. The module organizes a sectoral inventory for climate management at the Ministry of Mines and Energy. The national inventory has its own institutional owner.",
        },
        {
          question: "Which indicators does it cover?",
          answer: "The PIGCCme 2050 mitigation-indicator catalog, organized by generation, demand, efficiency, substitution, fugitive emissions, emissions, and tracking.",
        },
        {
          question: "Can emissions be viewed here?",
          answer: "No. This page explains the work. It does not publish series, factors, or dashboards from the institutional system.",
        },
      ],
    },
    me: {
      seoTitle: "Monitoring and evaluation of climate risk",
      description: "Climate hazard, vulnerability and risk M&E for mining and energy: CMIP6 scenarios and viewers, with Colombia's Ministry of Mines and Energy and KfW support.",
      keywords: ["monitoring and evaluation", "M&E", "climate risk", "climate vulnerability", "climate hazard", "climate adaptation", "CMIP6", "IPCC AR6", "SSP2-4.5", "climate geoviewer", "mining and energy sector", "GearsMap"],
      eyebrow: "M&E · Adaptation",
      title: "Monitoring and evaluation of hazard, vulnerability, and risk",
      lede: "The M&E module places climate risk on the map of the country and on the sector's infrastructure, so a baseline can be compared with future scenarios instead of leaving the analysis in a report no one reopens.",
      definitionLabel: "Definition",
      definition: "Climate monitoring and evaluation, in this work, is the repeatable reading of hazard, vulnerability, and risk — territorial and sectoral — and the tracking of how those conditions change against a baseline.",
      sections: [
        {
          id: "question",
          heading: "The question it answers",
          paragraphs: [
            "Knowing that the climate is changing is not enough. A sector team needs to know where hazard meets a specific vulnerability, and whether that condition worsens or improves against the reference period. The module turns that question into maps, dashboards, and deltas.",
            "The framework is IPCC AR6: risk = hazard × vulnerability. Vulnerability is read by component — ecosystems, agriculture and food security, human habitat, water, disaster risk, infrastructure, health, and energy — so a weakness is not hidden behind an average.",
          ],
        },
        {
          id: "territory",
          heading: "Territory, basins, and infrastructure",
          paragraphs: [
            "The territorial reading covers Colombia's 1,121 municipalities and the basins used in the analysis. Scenarios come from CMIP6: the 1990–2021 reference period and SSP2-4.5 and SSP3-7.0 projections on horizons through the end of the century. Change is expressed as an absolute and percentage delta against the baseline.",
            "The sectoral viewer carries the same logic onto mining and energy infrastructure: hydrocarbons, mining, generation — hydro, thermal, wind, solar, and non-interconnected zones — and networks. Risk does not stay on an abstract municipality. It can be read over the activity.",
            "Alongside the viewers are dashboards by scenario and period, climate-variable comparison, and a structured register for documenting adaptation actions: type, sector, territory, period, and indicator. This page does not present that register as a public procedure.",
          ],
        },
        {
          id: "limit",
          heading: "What it is not",
          paragraphs: [
            "It is not an operational weather forecast, a risk certification for a project, or an official publication of scenarios. It is the implementation of the monitoring and evaluation module inside the sector climate information system. Adaptation decisions remain with the team using the evidence.",
          ],
        },
      ],
      cardsTitle: "Parts of the module",
      cards: [
        { title: "Territorial viewer", text: "Municipal map of hazard, sensitivity, adaptive capacity, vulnerability, and risk, compared with the baseline.", points: ["Municipality and basin", "Filter by component and scenario", "Download with geographic context"] },
        { title: "Scenarios", text: "The 1990–2021 reference is compared with SSP2-4.5 and SSP3-7.0. It is not presented as a single future.", points: ["CMIP6 / IPCC AR6", "Horizons through 2100", "Absolute and percentage deltas"] },
        { title: "Sectoral reading", text: "Climate hazard is observed over the mining and energy chain, not only over administrative boundaries.", points: ["Hydrocarbons and mining", "Generation and networks", "Non-interconnected zones"] },
      ],
      factsTitle: "Terms in the module",
      facts: [
        { term: "Hazard", detail: "The climate condition that can affect a place or an activity. On its own, it is not the risk." },
        { term: "Vulnerability", detail: "Sensitivity and adaptive capacity. It is aggregated by component so the average does not erase the problem." },
        { term: "Risk", detail: "Hazard × vulnerability, under the IPCC AR6 framework used in the module." },
        { term: "Delta", detail: "Absolute or percentage change of an indicator against the 1990–2021 reference period." },
        { term: "EPSG:9377", detail: "Colombia's official reference frame (MAGNA-SIRGAS 2018) used for the geographic information." },
      ],
      faqs: [
        {
          question: "What is M&E in climate change?",
          answer: "Monitoring and evaluation. Here it means tracking climate hazard, vulnerability, and risk, and being able to compare a scenario with the baseline, not only publishing a static map.",
        },
        {
          question: "Which scenarios does the module use?",
          answer: "The IPCC AR6 CMIP6 framework: a 1990–2021 reference and SSP2-4.5 and SSP3-7.0 projections on horizons through the end of the century.",
        },
        {
          question: "Does it cover the whole country?",
          answer: "The territorial reading is built on Colombia's 1,121 municipalities and on the basins in the analysis. There is also a reading over mining and energy infrastructure.",
        },
        {
          question: "Does GearsMap certify a project's risk?",
          answer: "No. The module organizes evidence for technical teams. It does not replace a project risk study or an official adaptation decision.",
        },
      ],
    },
  },
  fr: {
    breadcrumbLabel: "Fil d'Ariane",
    home: "Accueil",
    readMore: "Lire le module",
    related: "Dans la même ligne de travail",
    faq: "Questions fréquentes",
    comparison: "MRV et S&E, côte à côte",
    comparisonCaption: "Comparaison entre le suivi, la notification et la vérification et le suivi-évaluation climatique.",
    disclaimer: "Cette page décrit le travail de mise en œuvre de GearsMap. Ce n'est pas une publication officielle du Ministère des Mines et de l'Énergie, elle n'implique pas d'aval institutionnel et elle ne donne pas accès au système. Les données opérationnelles, l'infrastructure interne et les informations contractuelles réservées ne sont pas publiées.",
    ctaTitle: "Votre organisation a-t-elle des données territoriales encore inutilisables ?",
    ctaBody: "Le même métier — sources, géométrie, indicateurs et une interface que l'équipe peut reprendre — vaut pour le climat, l'exploitation ou le territoire. Dites-nous la question difficile.",
    ctaLabel: "Parler d'un système",
    status: "Mise en œuvre opérationnelle",
    columnTopic: "Question",
    rows: [
      { topic: "Ce qu'il répond", mrv: "Combien est émis, et comment bougent les indicateurs d'atténuation.", me: "Où se situe le risque climatique, et comment il change par rapport à la ligne de base." },
      { topic: "Objet", mrv: "Inventaire sectoriel de GES et indicateurs d'atténuation.", me: "Aléa, vulnérabilité, risque et actions d'adaptation." },
      { topic: "Méthode", mrv: "Approche GIEC 2006 : donnée d'activité, facteur d'émission et potentiel de réchauffement.", me: "GIEC AR6 : risque = aléa × vulnérabilité." },
      { topic: "Territoire", mrv: "Lecture départementale et par ligne du secteur.", me: "Lecture municipale, par bassin et sur l'infrastructure." },
    ],
    hub: {
      seoTitle: "Systèmes MRV et S&E du secteur mines-énergie",
      description: "MRV et suivi-évaluation climatique du secteur minier et énergétique, avec le Ministère des Mines et de l'Énergie de Colombie et le soutien de la KfW.",
      keywords: ["MRV", "suivi et évaluation", "suivi notification et vérification", "système d'information climatique", "secteur minier et énergétique", "Ministère des Mines et de l'Énergie", "GES", "risque climatique", "Colombie", "KfW", "GearsMap"],
      eyebrow: "Travail complémentaire · Ministère des Mines et de l'Énergie",
      title: "Systèmes d'information climatique pour décider sur le territoire",
      lede: "GearsMap a accompagné la mise en œuvre opérationnelle des modules de suivi et évaluation (S&E) et de suivi, notification et vérification (MRV) du système d'information climatique du secteur minier et énergétique. Le travail a été réalisé avec le Ministère des Mines et de l'Énergie de Colombie et avec le soutien de la KfW.",
      definitionLabel: "En une phrase",
      definition: "Un système d'information climatique sectoriel réunit l'inventaire de gaz à effet de serre, les indicateurs d'atténuation et la lecture territoriale de l'aléa, de la vulnérabilité et du risque, pour qu'une équipe technique puisse consulter, comparer et rapporter.",
      sections: [
        {
          id: "portee",
          heading: "Ce qui a été mis en œuvre",
          paragraphs: [
            "La mission était opérationnelle : passer d'intrants, de méthodes et de fiches dispersés à des modules qu'une équipe peut parcourir. GearsMap s'est concentré sur les modules S&E et MRV du système d'information climatique du Ministère des Mines et de l'Énergie. Il n'a pas remplacé les études de base, et ce site ne publie pas un portail public.",
            "La contrepartie technique est le secteur minier et énergétique colombien. Le cadre de politique est le plan intégral de gestion du changement climatique du secteur (PIGCCme) et les contributions déterminées au niveau national (CDN). La KfW a soutenu cette ligne de mise en œuvre.",
          ],
        },
        {
          id: "complement",
          heading: "Comment cela complète le reste de GearsMap",
          paragraphs: [
            "GearsMap conçoit des plateformes géospatiales, des géovisionneuses, des tableaux de bord et des outils d'intelligence artificielle pour des données qui ne tiennent pas dans un tableur. Le travail climatique utilise le même métier : ordonner les sources, conserver la géométrie, expliquer l'indicateur et laisser une interface que l'équipe reprend.",
            "Cette ligne ne remplace pas le portefeuille. Elle l'étend à l'atténuation, à l'adaptation et à la transparence climatique, à côté des visionneuses régionales, de l'analyse territoriale et de l'exploitation.",
          ],
        },
      ],
      cardsTitle: "Deux modules, une plateforme",
      cards: [
        {
          title: "MRV · Suivi, notification et vérification",
          text: "Organise l'inventaire sectoriel des émissions et le suivi des indicateurs d'atténuation, avec formule, série et traçabilité.",
          points: ["Inventaire de GES selon l'approche GIEC 2006", "Indicateurs du PIGCCme 2050 par ligne stratégique", "Tableaux d'émissions et visionneuse départementale"],
        },
        {
          title: "S&E · Suivi et évaluation",
          text: "Lit l'aléa, la vulnérabilité et le risque sur les municipalités, les bassins et l'infrastructure, et compare les scénarios à une ligne de base.",
          points: ["Risque = aléa × vulnérabilité, GIEC AR6", "Scénarios CMIP6 jusqu'à la fin du siècle", "Visionneuse territoriale et visionneuse d'infrastructure énergétique"],
        },
      ],
      factsTitle: "Cadres utilisés",
      facts: [
        { term: "GIEC 2006", detail: "Approche d'estimation de l'inventaire : donnée d'activité, facteur d'émission et potentiel de réchauffement global." },
        { term: "GIEC AR6", detail: "Cadre de risque climatique utilisé en suivi-évaluation : risque = aléa × vulnérabilité." },
        { term: "CMIP6", detail: "Période de référence 1990-2021 et projections SSP2-4.5 et SSP3-7.0." },
        { term: "PIGCCme 2050", detail: "Plan du secteur et catalogue d'indicateurs d'atténuation que le module MRV organise pour la consultation." },
        { term: "CDN", detail: "Contributions déterminées de la Colombie. Le système appuie le suivi sectoriel ; il ne les remplace pas." },
      ],
      faqs: [
        {
          question: "Qu'est-ce qu'un système MRV dans le secteur minier et énergétique ?",
          answer: "C'est l'agencement de données, de calculs et de rapports pour suivre, notifier et vérifier les émissions de gaz à effet de serre et les indicateurs d'atténuation. Dans ce travail, le module MRV organise l'inventaire sectoriel et le catalogue d'indicateurs du PIGCCme 2050.",
        },
        {
          question: "Qu'est-ce que le suivi-évaluation du risque climatique ?",
          answer: "C'est la lecture périodique de l'aléa, de la vulnérabilité et du risque sur le territoire et sur les activités du secteur. Le module S&E utilise le cadre GIEC AR6 et compare les scénarios climatiques à une ligne de base.",
        },
        {
          question: "Quelle est la différence entre MRV et S&E ?",
          answer: "Le MRV répond à la question des émissions et de l'avancement des indicateurs d'atténuation. Le S&E répond à la question du lieu du risque climatique et de son évolution. Les deux modules coexistent dans le même système, mais ils ne mesurent pas la même chose.",
        },
        {
          question: "Ce travail remplace-t-il les géovisionneuses de GearsMap ?",
          answer: "Non. Il est complémentaire. GearsMap continue de concevoir des géovisionneuses, des tableaux de bord, de l'automatisation et de l'intelligence artificielle. Les modules climatiques appliquent cette pratique à l'atténuation et à l'adaptation.",
        },
        {
          question: "Puis-je consulter ici le système du Ministère ?",
          answer: "Non. Cette page ne donne pas accès au système institutionnel et ne publie pas ses données opérationnelles. Elle décrit le travail de mise en œuvre. Les canaux officiels du Ministère sont la voie pour l'information institutionnelle.",
        },
        {
          question: "GearsMap peut-il construire un système semblable pour une autre organisation ?",
          answer: "Oui, lorsqu'il y a une question territoriale claire, des sources identifiables et une équipe qui doit utiliser le résultat. Le point de départ est une conversation, pas un paquet fermé.",
        },
      ],
    },
    mrv: {
      seoTitle: "Système MRV des émissions de GES mines-énergie",
      description: "MRV du secteur minier et énergétique : inventaire de GES, indicateurs du PIGCCme 2050 et tableaux de bord, avec le Ministère et le soutien de la KfW.",
      keywords: ["MRV", "suivi notification et vérification", "inventaire GES", "gaz à effet de serre", "émissions fugitives", "PIGCCme 2050", "GIEC 2006", "transparence climatique", "secteur minier et énergétique", "GearsMap"],
      eyebrow: "MRV · Atténuation",
      title: "MRV : suivi, notification et vérification des émissions du secteur minier et énergétique",
      lede: "Le module MRV ordonne l'inventaire sectoriel de gaz à effet de serre et le suivi des indicateurs d'atténuation, pour qu'une équipe technique puisse revoir la série, la formule et le territoire sans reconstruire le calcul.",
      definitionLabel: "Définition",
      definition: "MRV signifie suivi, notification et vérification. Dans le secteur minier et énergétique, c'est la façon de suivre les émissions et les indicateurs d'atténuation avec une piste claire de données, de facteurs et de résultats.",
      sections: [
        {
          id: "organise",
          heading: "Ce qu'il organise",
          paragraphs: [
            "L'inventaire sectoriel estime les émissions selon l'approche du GIEC 2006 : donnée d'activité, facteur d'émission et potentiel de réchauffement global. La lecture peut s'ouvrir par gaz, combustible, catégorie, département et année.",
            "À côté de l'inventaire se trouve le catalogue d'indicateurs du PIGCCme 2050, regroupé par génération, demande, efficacité, substitution, émissions fugitives, émissions et suivi. Chaque indicateur conserve sa formule, ses paramètres, ses dépendances et sa série.",
          ],
        },
        {
          id: "consultation",
          heading: "Ce qu'une équipe peut consulter",
          paragraphs: [
            "Le module propose des tableaux d'émissions et d'intensité, la fiche d'indicateur et une visionneuse géographique départementale. L'ingestion combine des connecteurs vers des sources publiques du secteur, un chargement manuel audité et la dérivation d'indicateurs dépendants. XM, l'UPME, l'IPSE, la surveillance des services publics, l'ANH et des systèmes comme RENARE sont des sources du secteur. Cette page ne documente pas ces connexions de l'intérieur.",
            "La traçabilité compte plus que le graphique. Un résultat doit pouvoir revenir à son lot, à son facteur et à sa formule.",
          ],
        },
        {
          id: "limite",
          heading: "Ce que ce n'est pas",
          paragraphs: [
            "Ce n'est pas l'inventaire national de gaz à effet de serre, ni un calculateur public, ni un aval de chiffres. C'est la mise en œuvre opérationnelle du module sectoriel. Les chiffres officiels restent auprès de leurs sources et des canaux institutionnels.",
          ],
        },
      ],
      cardsTitle: "Pièces du module",
      cards: [
        { title: "Inventaire sectoriel", text: "Émissions estimées à partir de la donnée d'activité, du facteur et du potentiel de réchauffement.", points: ["Gaz, combustible et catégorie", "Département et année", "Intensité et facteurs appliqués"] },
        { title: "Fiche d'indicateur", text: "Le catalogue du PIGCCme 2050 devient une fiche consultable, plus une collection de fichiers.", points: ["Formule et paramètres", "Dépendances entre indicateurs", "Série temporelle et ventilation"] },
        { title: "Ingestion traçable", text: "Les données entrent par plusieurs portes, sans se mélanger sans registre.", points: ["Connecteurs vers les sources du secteur", "Chargement manuel audité", "Indicateurs dérivés"] },
      ],
      factsTitle: "Termes du module",
      facts: [
        { term: "GES", detail: "Gaz à effet de serre. L'inventaire sectoriel les estime ; il ne les déclare pas comme chiffre national." },
        { term: "GIEC 2006", detail: "Lignes directrices utilisées comme approche de calcul : activité × facteur d'émission × potentiel de réchauffement." },
        { term: "Émissions fugitives", detail: "Ligne propre du catalogue, utile pour les hydrocarbures et le suivi du méthane. Cette page ne publie pas un inventaire de fuites." },
        { term: "Transparence", detail: "Pouvoir expliquer d'où vient un nombre, pas seulement l'afficher dans un tableau." },
      ],
      faqs: [
        {
          question: "Que signifie MRV ?",
          answer: "Suivi, notification et vérification. C'est la pratique de mesurer des émissions ou des indicateurs, de les rapporter avec une méthode et de laisser une vérification possible.",
        },
        {
          question: "Le MRV de GearsMap est-il l'inventaire national de GES ?",
          answer: "Non. Le module organise un inventaire sectoriel pour la gestion climatique du Ministère des Mines et de l'Énergie. L'inventaire national a son propre responsable institutionnel.",
        },
        {
          question: "Quels indicateurs couvre-t-il ?",
          answer: "Le catalogue d'indicateurs d'atténuation du PIGCCme 2050, organisé par génération, demande, efficacité, substitution, émissions fugitives, émissions et suivi.",
        },
        {
          question: "Peut-on voir les émissions ici ?",
          answer: "Non. Cette page explique le travail. Elle ne publie ni séries, ni facteurs, ni tableaux du système institutionnel.",
        },
      ],
    },
    me: {
      seoTitle: "Suivi et évaluation du risque climatique",
      description: "Suivi-évaluation de l'aléa, de la vulnérabilité et du risque climatique du secteur minier et énergétique, avec le Ministère et le soutien de la KfW.",
      keywords: ["suivi et évaluation", "risque climatique", "vulnérabilité climatique", "adaptation au changement climatique", "CMIP6", "GIEC AR6", "SSP2-4.5", "géovisionneuse", "secteur minier et énergétique", "GearsMap", "Colombie"],
      eyebrow: "S&E · Adaptation",
      title: "Suivi et évaluation de l'aléa, de la vulnérabilité et du risque",
      lede: "Le module de suivi et évaluation place le risque climatique sur la carte du pays et sur l'infrastructure du secteur, afin de comparer une ligne de base à des scénarios futurs.",
      definitionLabel: "Définition",
      definition: "Le suivi-évaluation climatique, dans ce travail, est la lecture répétable de l'aléa, de la vulnérabilité et du risque — territoriale et sectorielle — et le suivi de leur évolution par rapport à une ligne de base.",
      sections: [
        {
          id: "question",
          heading: "La question à laquelle il répond",
          paragraphs: [
            "Savoir que le climat change ne suffit pas. Une équipe du secteur doit savoir où l'aléa rencontre une vulnérabilité précise, et si cette condition s'aggrave ou s'améliore par rapport à la période de référence. Le module transforme cette question en cartes, tableaux et deltas.",
            "Le cadre est celui du GIEC AR6 : risque = aléa × vulnérabilité. La vulnérabilité se lit par composantes — écosystèmes, agriculture et sécurité alimentaire, habitat humain, ressource en eau, risque de catastrophe, infrastructure, santé et énergie — pour qu'une faiblesse ne disparaisse pas derrière une moyenne.",
          ],
        },
        {
          id: "territoire",
          heading: "Territoire, bassins et infrastructure",
          paragraphs: [
            "La lecture territoriale couvre les 1 121 municipalités du pays et les bassins utilisés dans l'analyse. Les scénarios viennent de CMIP6 : la période de référence 1990-2021 et les projections SSP2-4.5 et SSP3-7.0 jusqu'à la fin du siècle. Le changement s'exprime en delta absolu et en pourcentage par rapport à la ligne de base.",
            "La visionneuse sectorielle applique la même logique à l'infrastructure minière et énergétique : hydrocarbures, mines, production — hydraulique, thermique, éolien, solaire et zones non interconnectées — et réseaux.",
            "À côté des visionneuses, des tableaux par scénario et par période, la comparaison de variables climatiques et un registre structuré pour documenter des actions d'adaptation. Cette page ne présente pas ce registre comme une démarche publique.",
          ],
        },
        {
          id: "limite",
          heading: "Ce que ce n'est pas",
          paragraphs: [
            "Ce n'est pas une prévision météo opérationnelle, ni une certification de risque pour un projet, ni une publication officielle de scénarios. C'est la mise en œuvre du module de suivi-évaluation dans le système d'information climatique du secteur.",
          ],
        },
      ],
      cardsTitle: "Pièces du module",
      cards: [
        { title: "Visionneuse territoriale", text: "Carte municipale de l'aléa, de la sensibilité, de la capacité d'adaptation, de la vulnérabilité et du risque, comparée à la ligne de base.", points: ["Municipalité et bassin", "Filtre par composante et scénario", "Téléchargement avec contexte géographique"] },
        { title: "Scénarios", text: "La référence 1990-2021 est comparée aux SSP2-4.5 et SSP3-7.0. Elle n'est pas présentée comme un futur unique.", points: ["CMIP6 / GIEC AR6", "Horizons jusqu'en 2100", "Deltas absolus et en pourcentage"] },
        { title: "Lecture sectorielle", text: "L'aléa climatique s'observe sur la chaîne minière et énergétique, pas seulement sur le découpage administratif.", points: ["Hydrocarbures et mines", "Production et réseaux", "Zones non interconnectées"] },
      ],
      factsTitle: "Termes du module",
      facts: [
        { term: "Aléa", detail: "La condition climatique qui peut affecter un lieu ou une activité. À elle seule, ce n'est pas le risque." },
        { term: "Vulnérabilité", detail: "Sensibilité et capacité d'adaptation. Elle est agrégée par composantes pour que la moyenne n'efface pas le problème." },
        { term: "Risque", detail: "Aléa × vulnérabilité, selon le cadre GIEC AR6 utilisé dans le module." },
        { term: "Delta", detail: "Variation absolue ou en pourcentage d'un indicateur par rapport à la période 1990-2021." },
        { term: "EPSG:9377", detail: "Cadre de référence officiel de la Colombie (MAGNA-SIRGAS 2018) utilisé pour l'information géographique." },
      ],
      faqs: [
        {
          question: "Qu'est-ce que le S&E dans le changement climatique ?",
          answer: "Le suivi et l'évaluation. Ici, cela signifie suivre l'aléa, la vulnérabilité et le risque climatique, et pouvoir comparer un scénario à la ligne de base.",
        },
        {
          question: "Quels scénarios le module utilise-t-il ?",
          answer: "Le cadre CMIP6 du GIEC AR6 : référence 1990-2021 et projections SSP2-4.5 et SSP3-7.0 jusqu'à la fin du siècle.",
        },
        {
          question: "Couvre-t-il tout le pays ?",
          answer: "La lecture territoriale est construite sur les 1 121 municipalités de Colombie et sur les bassins de l'analyse. Il existe aussi une lecture sur l'infrastructure du secteur.",
        },
        {
          question: "GearsMap certifie-t-il le risque d'un projet ?",
          answer: "Non. Le module organise des éléments de preuve pour des équipes techniques. Il ne remplace ni une étude de risque de projet ni une décision officielle d'adaptation.",
        },
      ],
    },
  },
}

export function getClimate(locale: Locale) {
  return climateContent[locale]
}

export function climatePage(locale: Locale, page: ClimatePageKey) {
  return climateContent[locale][page]
}

export const climatePageOrder: ClimatePageKey[] = ["hub", "mrv", "me"]

export function relatedClimatePages(page: ClimatePageKey): ClimatePageKey[] {
  return climatePageOrder.filter((item) => item !== page)
}
