import roundedWordmark from './assets/rounded-wordmark.svg'
import foundation from './assets/foundation.svg'
import loopWordmark from './assets/loop-wordmark.svg'
import circularMark from './assets/circular-mark.svg'
import spiralMark from './assets/spiral-mark.svg'
import handwrittenWordmark from './assets/handwritten-wordmark.svg'
import interlockingMark from './assets/interlocking-mark.svg'
import ipsumWordmark from './assets/ipsum-wordmark.svg'
import stripedWordmark from './assets/striped-wordmark.svg'
import petalMark from './assets/petal-mark.svg'
import rainbowWordmark from './assets/rainbow-wordmark.svg'
import ribbonMark from './assets/ribbon-mark.svg'

interface Partner {
  id: string
  name: string
  image: string
  size: number
  mobileSize: number
}

// Optical sizing keeps wordmarks and compact symbols visually balanced.
export const partners: Partner[] = [
  {
    id: 'rounded-wordmark',
    name: 'Logoipsum — rounded wordmark',
    image: roundedWordmark,
    size: 50,
    mobileSize: 70,
  },
  {
    id: 'foundation',
    name: 'Logoipsum Foundation',
    image: foundation,
    size: 65,
    mobileSize: 75,
  },
  {
    id: 'loop-wordmark',
    name: 'Logo — loop wordmark',
    image: loopWordmark,
    size: 50,
    mobileSize: 65,
  },
  {
    id: 'circular-mark',
    name: 'Logoipsum — circular mark',
    image: circularMark,
    size: 35,
    mobileSize: 45,
  },
  {
    id: 'spiral-mark',
    name: 'Logoipsum — spiral mark',
    image: spiralMark,
    size: 35,
    mobileSize: 50,
  },
  {
    id: 'handwritten-wordmark',
    name: 'Logo Ipsum — handwritten wordmark',
    image: handwrittenWordmark,
    size: 45,
    mobileSize: 65,
  },
  {
    id: 'interlocking-mark',
    name: 'Logoipsum — interlocking mark',
    image: interlockingMark,
    size: 35,
    mobileSize: 45,
  },
  {
    id: 'ipsum-wordmark',
    name: 'Ipsum',
    image: ipsumWordmark,
    size: 45,
    mobileSize: 70,
  },
  {
    id: 'striped-wordmark',
    name: 'Ipsum — striped wordmark',
    image: stripedWordmark,
    size: 40,
    mobileSize: 65,
  },
  {
    id: 'petal-mark',
    name: 'Logoipsum — petal mark',
    image: petalMark,
    size: 35,
    mobileSize: 50,
  },
  {
    id: 'rainbow-wordmark',
    name: 'Logo Ipsum — rainbow wordmark',
    image: rainbowWordmark,
    size: 40,
    mobileSize: 55,
  },
  {
    id: 'ribbon-mark',
    name: 'Logoipsum — ribbon mark',
    image: ribbonMark,
    size: 32,
    mobileSize: 40,
  },
]
