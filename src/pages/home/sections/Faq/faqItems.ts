export interface FaqItemData {
  id: string
  question: string
  answer: string
}

export const faqItems: readonly FaqItemData[] = [
  {
    id: 'new-project',
    question: 'How do you start a new project?',
    answer: 'We start by listening. Every project begins with a short discovery phase where we learn about your goals, challenges, and expectations. From there, we define the creative direction, map out deliverables, and set a timeline that balances clarity with craft.',
  },
  {
    id: 'strategy',
    question: 'Can you help with strategy, not just design?',
    answer: 'Yes — strategy is part of everything we do. Before we design, we help define your message, audience, and positioning. That foundation shapes how your brand looks, feels, and communicates across every touchpoint.',
  },
  {
    id: 'timeline',
    question: 'How long does a typical project take?',
    answer: 'It depends on the scope and level of detail. A small website or brand refresh may take around 4–6 weeks, while larger, more complex projects often need 8–12 weeks. We always plan collaboratively to make sure deadlines fit both sides.',
  },
  {
    id: 'discovery',
    question: 'What if I don’t know exactly what I need?',
    answer: 'That’s completely fine. Many collaborations start that way. We’ll guide you through a short discovery process to clarify your goals and define what makes the most impact — whether it’s a rebrand, a digital experience, or something entirely new.',
  },
]
