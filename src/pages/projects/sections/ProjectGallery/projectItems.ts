import commonFutureImage from './assets/common-future-co-768.webp'
import commonFutureImageLarge from './assets/common-future-co-1536.webp'
import lumenPathImage from './assets/lumen-path-studio-768.webp'
import lumenPathImageLarge from './assets/lumen-path-studio-1536.webp'
import paperBloomImage from './assets/paper-bloom-collective-768.webp'
import paperBloomImageLarge from './assets/paper-bloom-collective-1536.webp'
import thirdLightImage from './assets/third-light-project-768.webp'
import thirdLightImageLarge from './assets/third-light-project-1536.webp'
import velvetSignalImage from './assets/velvet-signal-lab-768.webp'
import velvetSignalImageLarge from './assets/velvet-signal-lab-1536.webp'
import novaDriftImage from './assets/nova-drift-studio-768.webp'
import novaDriftImageLarge from './assets/nova-drift-studio-1536.webp'
import goldenFrameImage from './assets/golden-frame-agency-768.webp'
import goldenFrameImageLarge from './assets/golden-frame-agency-1536.webp'
import orchardNorthImage from './assets/orchard-north-works-768.webp'
import orchardNorthImageLarge from './assets/orchard-north-works-1536.webp'

interface ProjectItem {
  slug: string
  title: string
  category: string
  description: string
  image: string
  imageLarge: string
  imageAlt: string
}

export const projectItems: ProjectItem[] = [
  {
    slug: 'common-future-co',
    title: 'Common Future Co.',
    category: 'Strategy / Digital',
    description: 'A clear, confident digital identity built around a shared vision for tomorrow.',
    image: commonFutureImage,
    imageLarge: commonFutureImageLarge,
    imageAlt: 'Close-up portrait with platinum hair and a green eye.',
  },
  {
    slug: 'lumen-path-studio',
    title: 'Lumen Path Studio',
    category: 'Web / Creative Direction',
    description: 'An expressive portfolio that puts cinematic storytelling at the heart of every interaction.',
    image: lumenPathImage,
    imageLarge: lumenPathImageLarge,
    imageAlt: 'Pink and blue cosmetic bottles surrounded by floating pink flowers.',
  },
  {
    slug: 'paper-bloom-collective',
    title: 'Paper Bloom Collective',
    category: 'Visual Identity / Web',
    description: 'An inviting online experience with the warmth and character of an independent shop.',
    image: paperBloomImage,
    imageLarge: paperBloomImageLarge,
    imageAlt: 'Portrait surrounded by green foliage and small yellow flowers.',
  },
  {
    slug: 'third-light-project',
    title: 'Third Light Project',
    category: 'Digital / Creative Direction',
    description: 'Bold layouts and immersive imagery create a digital home for experimental creative work.',
    image: thirdLightImage,
    imageLarge: thirdLightImageLarge,
    imageAlt: 'Silhouette of a basketball player against a vivid blue background.',
  },
  {
    slug: 'velvet-signal-lab',
    title: 'Velvet Signal Lab',
    category: 'Branding / UX/UI',
    description: 'A thoughtful brand and interface that make emerging technology feel approachable.',
    image: velvetSignalImage,
    imageLarge: velvetSignalImageLarge,
    imageAlt: 'Dancer in orange trousers against a bright green background.',
  },
  {
    slug: 'nova-drift-studio',
    title: 'Nova Drift Studio',
    category: 'Digital / UX/UI',
    description: 'A playful digital world shaped around the imagination of an independent games studio.',
    image: novaDriftImage,
    imageLarge: novaDriftImageLarge,
    imageAlt: 'Rear of a blue sports car surrounded by purple smoke.',
  },
  {
    slug: 'golden-frame-agency',
    title: 'Golden Frame Agency',
    category: 'Branding / Campaign',
    description: 'A distinctive launch campaign with confident typography, vivid color, and a cohesive visual language.',
    image: goldenFrameImage,
    imageLarge: goldenFrameImageLarge,
    imageAlt: 'An animated woolly sheep standing in a blue woodland scene.',
  },
  {
    slug: 'orchard-north-works',
    title: 'Orchard North Works',
    category: 'Branding / Web',
    description: 'A welcoming identity and website for a community built on working together.',
    image: orchardNorthImage,
    imageLarge: orchardNorthImageLarge,
    imageAlt: 'Hands holding orange cosmetic bottles in splashing water.',
  },
]
