
import { QuizQuestion, UseCase } from './types';

export const serUses: UseCase[] = [
  {
    rule: 'Description',
    acronym: 'D',
    explanation: 'For essential qualities that define a person or thing.',
    example: 'Ella es alta y simpática.',
    translation: 'She is tall and nice.'
  },
  {
    rule: 'Occupation',
    acronym: 'O',
    explanation: 'For professions or jobs.',
    example: 'Mi padre es médico.',
    translation: 'My father is a doctor.'
  },
  {
    rule: 'Characteristic',
    acronym: 'C',
    explanation: 'For personality traits or inherent features.',
    example: 'El hielo es frío.',
    translation: 'Ice is cold.'
  },
  {
    rule: 'Time',
    acronym: 'T',
    explanation: 'For telling time, days, dates, and seasons.',
    example: 'Hoy es martes. Son las tres.',
    translation: 'Today is Tuesday. It is three o\'clock.'
  },
  {
    rule: 'Origin',
    acronym: 'O',
    explanation: 'For saying where someone or something is from.',
    example: 'Somos de Argentina.',
    translation: 'We are from Argentina.'
  },
  {
    rule: 'Relationship',
    acronym: 'R',
    explanation: 'For describing relationships between people.',
    example: 'Marta es mi hermana.',
    translation: 'Marta is my sister.'
  },
];

export const estarUses: UseCase[] = [
  {
    rule: 'Position',
    acronym: 'P',
    explanation: 'For physical position or posture.',
    example: 'El libro está en la mesa.',
    translation: 'The book is on the table.'
  },
  {
    rule: 'Location',
    acronym: 'L',
    explanation: 'For the location of someone or something.',
    example: 'Estamos en el parque.',
    translation: 'We are at the park.'
  },
  {
    rule: 'Action',
    acronym: 'A',
    explanation: 'For ongoing actions (present progressive).',
    example: 'Estoy comiendo ahora.',
    translation: 'I am eating now.'
  },
  {
    rule: 'Condition',
    acronym: 'C',
    explanation: 'For physical and mental conditions that can change.',
    example: 'La sopa está caliente.',
    translation: 'The soup is hot.'
  },
  {
    rule: 'Emotion',
    acronym: 'E',
    explanation: 'For feelings and emotions.',
    example: 'Ellos están felices hoy.',
    translation: 'They are happy today.'
  },
];


export const quizQuestions: QuizQuestion[] = [
  {
    sentence: "Yo ___ muy cansado hoy.",
    options: [
      { text: "soy", isCorrect: false },
      { text: "estoy", isCorrect: true },
    ],
    explanation: "'Estar' is used for temporary conditions and feelings like being tired."
  },
  {
    sentence: "Mi abuela ___ de Colombia.",
    options: [
      { text: "es", isCorrect: true },
      { text: "está", isCorrect: false },
    ],
    explanation: "'Ser' is used to indicate origin."
  },
  {
    sentence: "Nosotros ___ estudiando para el examen.",
    options: [
      { text: "somos", isCorrect: false },
      { text: "estamos", isCorrect: true },
    ],
    explanation: "'Estar' is used to form the present progressive tense for ongoing actions."
  },
  {
    sentence: "El cielo ___ azul.",
    options: [
      { text: "es", isCorrect: true },
      { text: "está", isCorrect: false },
    ],
    explanation: "'Ser' is used for inherent characteristics, like the color of the sky."
  },
  {
    sentence: "¿Dónde ___ el baño?",
    options: [
      { text: "es", isCorrect: false },
      { text: "está", isCorrect: true },
    ],
    explanation: "'Estar' is used to ask for the location of something."
  },
  {
    sentence: "Tú ___ mi mejor amigo.",
    options: [
      { text: "eres", isCorrect: true },
      { text: "estás", isCorrect: false },
    ],
    explanation: "'Ser' is used to define relationships."
  }
];
