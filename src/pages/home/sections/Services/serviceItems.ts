interface ServiceItem {
  id: string
  index: string
  description: string
  capabilities: readonly string[]
}

export const serviceItems: readonly ServiceItem[] = [
  {
    id: 'brand-identity',
    index: 'A',
    description:
      'We create identity systems that bring clarity and distinction to brands — thoughtful visuals, cohesive structure, and design that lasts.',
    capabilities: [
      'Brand Strategy',
      'Visual Identity System',
      'Logo & Mark Development',
      'Typography & Color System',
      'Guidelines & Asset Library',
    ],
  },
  {
    id: 'digital-experiences',
    index: 'B',
    description:
      'We design intuitive, expressive digital experiences shaped by strong visual direction and seamless interaction across all screens.',
    capabilities: [
      'Website & Platform Design',
      'Interaction & Motion Guidelines',
      'UI Systems',
      'Component Libraries',
      'Responsive Layouts',
    ],
  },
  {
    id: 'creative-direction',
    index: 'C',
    description:
      'We guide ideas from concept to execution, shaping visual and narrative direction for consistent expression across every touchpoint.',
    capabilities: [
      'Visual Direction',
      'Campaign Concepts',
      'Art Direction for Photo & Film',
      'Tone & Narrative Guidance',
      'Style Frameworks',
    ],
  },
  {
    id: 'strategy-and-consulting',
    index: 'D',
    description:
      'We help teams make confident decisions by defining direction, sharpening positioning, and building the foundation for meaningful growth.',
    capabilities: [
      'Brand Positioning',
      'Market & Audience Insights',
      'Naming & Messaging',
      'Design Audits',
      'Roadmaps & Recommendations',
    ],
  },
]
