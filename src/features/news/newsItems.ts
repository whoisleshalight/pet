import logicOfEmotionImage from './assets/logic-of-emotion.webp'
import precisionOverPerfectionImage from './assets/precision-over-perfection.webp'
import designingTheInvisibleImage from './assets/designing-the-invisible.webp'
import beyondFunctionImage from './assets/beyond-function.webp'
import systemsWithSoulImage from './assets/systems-with-soul.webp'
import architectureOfMeaningImage from './assets/the-architecture-of-meaning.webp'
import humanAlgorithmImage from './assets/the-human-algorithm.webp'
import thinkingInMotionImage from './assets/thinking-in-motion.webp'
import languageOfShapeImage from './assets/the-language-of-shape.webp'
import oneIdeaManyFormsImage from './assets/one-idea-many-forms.webp'
import clarityParadoxImage from './assets/the-clarity-paradox.webp'

export interface NewsItem {
  slug: string
  title: string
  date: string
  dateLabel: string
  description: string
  image: string
  imageAlt: string
  imageWidth: number
  imageHeight: number
  imagePosition?: string
  paragraphs: readonly string[]
}

export const newsItems: readonly NewsItem[] = [
  {
    slug: 'the-logic-of-emotion',
    title: 'The Logic of Emotion',
    date: '2026-04-26',
    dateLabel: 'April 26, 2026',
    description: 'How clarity and emotion come together to give a design its own voice.',
    image: logicOfEmotionImage,
    imageAlt: 'A woman in profile wearing a sculptural white paper garment.',
    imageWidth: 771,
    imageHeight: 1024,
    imagePosition: '63.9% 28.8%',
    paragraphs: [
      'A useful interface can still leave us cold. The emotional character of a design comes from smaller choices: the space around a sentence, the weight of a heading, the pace of a transition. Together, these decisions tell us how to feel before we have finished reading.',
      'We begin with a clear purpose, then look for the details that make it recognisable. Each element should support that purpose. When structure and expression agree, the experience feels confident without needing to explain itself.',
    ],
  },
  {
    slug: 'precision-over-perfection',
    title: 'Precision Over Perfection',
    date: '2026-03-29',
    dateLabel: 'March 29, 2026',
    description: 'A closer look at the details that matter, and the decisions that make a design work.',
    image: precisionOverPerfectionImage,
    imageAlt: 'White serif lettering in sharp and soft focus against black.',
    imageWidth: 771,
    imageHeight: 1024,
    paragraphs: [
      'Every project has a limited amount of attention available. We spend it where a decision changes the experience: a readable paragraph, an obvious next step, a response that arrives when someone expects it.',
      'Precision means knowing which details carry the idea. Reviewing a design in context, with real content and real interactions, helps us put care where people will actually feel it.',
    ],
  },
  {
    slug: 'the-language-of-shape',
    title: 'The Language of Shape',
    date: '2026-04-12',
    dateLabel: 'April 12, 2026',
    description: 'An exploration of silhouette, contrast, and the character held in a single line.',
    image: languageOfShapeImage,
    imageAlt: 'The side profile of a white humanoid robot against a grey background.',
    imageWidth: 771,
    imageHeight: 1024,
    paragraphs: [
      'A shape sets expectations. A rounded edge can feel approachable; a sharp silhouette can suggest precision. These associations become useful when they are consistent with the rest of a visual identity.',
      'We test forms at different sizes and in different settings. A strong shape keeps its character in a small icon, a large image, and the spaces between the two.',
    ],
  },
  {
    slug: 'designing-the-invisible',
    title: 'Designing the Invisible',
    date: '2026-03-20',
    dateLabel: 'March 20, 2026',
    description: 'The quiet decisions behind experiences that feel natural from the first interaction.',
    image: designingTheInvisibleImage,
    imageAlt: 'A woman’s profile formed from flowing black mesh on an ivory background.',
    imageWidth: 771,
    imageHeight: 1024,
    paragraphs: [
      'People rarely arrive at a website to admire its spacing system. They arrive with a question or a task. Hierarchy, rhythm, and feedback help them move forward without having to study the interface.',
      'We watch the moments where someone hesitates. Often the right change is modest: a clearer label, a better grouping, or a little more breathing room around an important choice.',
    ],
  },
  {
    slug: 'the-architecture-of-meaning',
    title: 'The Architecture of Meaning',
    date: '2026-03-02',
    dateLabel: 'March 2, 2026',
    description: 'Connecting a brand’s central idea to the systems people encounter every day.',
    image: architectureOfMeaningImage,
    imageAlt: 'A lone figure on a narrow white walkway extending into darkness.',
    imageWidth: 1024,
    imageHeight: 1024,
    paragraphs: [
      'A brand takes shape across many decisions. Its language, imagery, and digital behaviour should give people compatible signals, even when each part appears on a different platform.',
      'A shared idea gives those decisions a foundation. We describe that idea in practical terms, then build a system that helps a team apply it without repeating the same conversation every time.',
    ],
  },
  {
    slug: 'one-idea-many-forms',
    title: 'One Idea, Many Forms',
    date: '2026-02-06',
    dateLabel: 'February 6, 2026',
    description: 'Following an idea as it moves between objects, images, and digital experiences.',
    image: oneIdeaManyFormsImage,
    imageAlt: 'A faceted white horse sculpture against a pale blue background.',
    imageWidth: 1024,
    imageHeight: 1024,
    paragraphs: [
      'Consistency does not require every application to look identical. An idea can express itself through different materials, proportions, and compositions while retaining a recognisable point of view.',
      'We distinguish the decisions that define an identity from the ones that can adapt. That gives a system enough freedom to stay useful as its context changes.',
    ],
  },
  {
    slug: 'beyond-function',
    title: 'Beyond Function',
    date: '2026-02-04',
    dateLabel: 'February 4, 2026',
    description: 'What makes a useful experience become something people remember and return to?',
    image: beyondFunctionImage,
    imageAlt: 'A black letter M intertwined with delicate botanical line drawings.',
    imageWidth: 853,
    imageHeight: 1024,
    paragraphs: [
      'Function gives an experience a reason to exist. Character gives us a reason to remember it. The most engaging work brings the two together without asking people to work harder.',
      'We look for moments where expression can improve understanding: an image that makes an idea tangible, a transition that explains a relationship, or a line of copy that sounds like a person.',
    ],
  },
  {
    slug: 'the-human-algorithm',
    title: 'The Human Algorithm',
    date: '2026-01-18',
    dateLabel: 'January 18, 2026',
    description: 'Where repeatable methods meet the judgement that makes creative work feel human.',
    image: humanAlgorithmImage,
    imageAlt: 'Two opposing human profiles blended with monochrome city textures.',
    imageWidth: 959,
    imageHeight: 1024,
    paragraphs: [
      'A process can make good decisions easier to repeat. It cannot tell us everything about the people who will live with the result. Observation and judgement remain part of the work.',
      'We use systems to make room for attention. When routine choices have a reliable foundation, we can spend more time questioning assumptions and responding to the particular needs of a project.',
    ],
  },
  {
    slug: 'the-clarity-paradox',
    title: 'The Clarity Paradox',
    date: '2026-01-04',
    dateLabel: 'January 4, 2026',
    description: 'Why making an experience feel effortless often takes the most careful thought.',
    image: clarityParadoxImage,
    imageAlt: 'Three textured black business cards floating against a black background.',
    imageWidth: 771,
    imageHeight: 1024,
    paragraphs: [
      'A clear result can conceal a complicated set of decisions. Editing takes time because every removal changes the balance of what remains. Simplicity becomes useful when the important relationships are still visible.',
      'We test clarity by asking what someone can understand and do. That keeps the discussion connected to the experience instead of the number of elements on a page.',
    ],
  },
  {
    slug: 'systems-with-soul',
    title: 'Systems with Soul',
    date: '2025-12-21',
    dateLabel: 'December 21, 2025',
    description: 'Building visual foundations with room for personality, variation, and a human touch.',
    image: systemsWithSoulImage,
    imageAlt: 'A vintage Macintosh computer with a keyboard, mouse, and red apple.',
    imageWidth: 1024,
    imageHeight: 1024,
    paragraphs: [
      'A visual system should help people make decisions with confidence. If every application feels interchangeable, the system may be describing the mechanics more clearly than the character.',
      'We include examples of variation alongside the rules. Showing how an identity can respond to different content gives a team permission to use judgement while preserving a common foundation.',
    ],
  },
  {
    slug: 'thinking-in-motion',
    title: 'Thinking in Motion',
    date: '2025-12-07',
    dateLabel: 'December 7, 2025',
    description: 'Using timing and movement to make relationships between ideas easier to understand.',
    image: thinkingInMotionImage,
    imageAlt: 'A lone figure beside a deep crack across a sunlit sandy surface.',
    imageWidth: 982,
    imageHeight: 1024,
    paragraphs: [
      'Movement gives an interface a sense of cause and effect. A well-timed transition can show where something came from, what changed, and where attention should go next.',
      'We begin with a purpose for each motion, then adjust its distance and pace. The experience should remain clear when movement is reduced, and controls should respond as soon as someone uses them.',
    ],
  },
]
