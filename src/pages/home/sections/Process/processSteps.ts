interface ProcessStep {
  id: 'discovery' | 'strategy' | 'design' | 'development'
  title: string
  description: string
}

export const processSteps: ProcessStep[] = [
  {
    id: 'discovery',
    title: 'Discovery',
    description:
      'We start by listening. This phase is about understanding your goals, audience, and challenges — finding clarity before we begin designing.',
  },
  {
    id: 'strategy',
    title: 'Strategy',
    description:
      'We translate insights into direction. Here, we define the concept, structure, and creative approach that shape your brand or digital product.',
  },
  {
    id: 'design',
    title: 'Design',
    description:
      'We turn strategy into a clear visual direction. Through layouts, typography, and interactive prototypes, we shape a website that feels distinctive and easy to use.',
  },
  {
    id: 'development',
    title: 'Development',
    description:
      'We bring the design to life with responsive, accessible, and reliable code. Every interaction is built, tested, and refined before the website goes live.',
  },
]
