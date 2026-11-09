import logicOfEmotionImage from './assets/logic-of-emotion.webp'
import precisionOverPerfectionImage from './assets/precision-over-perfection.webp'

export interface StudioNote {
  id: string
  title: string
  date: string
  dateLabel: string
  description: string
  image: string
  imageAlt: string
  imagePosition: string
}

export const studioNoteItems: StudioNote[] = [
  {
    id: 'the-logic-of-emotion',
    title: 'The Logic of Emotion',
    date: '2026-04-26',
    dateLabel: 'April 26, 2026',
    description:
      'How clarity and emotion come together to give a design its own voice.',
    image: logicOfEmotionImage,
    imageAlt: 'Profile portrait of a woman in a sculptural white paper garment.',
    imagePosition: '63.9% 28.8%',
  },
  {
    id: 'precision-over-perfection',
    title: 'Precision Over Perfection',
    date: '2026-03-29',
    dateLabel: 'March 29, 2026',
    description:
      'A closer look at the details that matter, and the decisions that make a design work.',
    image: precisionOverPerfectionImage,
    imageAlt: 'Close-up of white serif typography on a black printed surface.',
    imagePosition: 'center',
  },
]
