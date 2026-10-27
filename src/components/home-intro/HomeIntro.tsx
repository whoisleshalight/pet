import { useRef } from 'react'
import { Link } from 'react-router'
import { routePaths } from '../../app/router/routePaths'
import { portfolio } from '../../config/portfolio'
import { useHomeIntroAnimation } from './useHomeIntroAnimation'
import './HomeIntro.css'

export function HomeIntro() {
  const introductionReference = useRef<HTMLElement>(null)

  useHomeIntroAnimation(introductionReference)

  return (
    <section
      className="home-intro"
      ref={introductionReference}
      aria-labelledby="home-intro-title"
    >
      <div className="home-intro__content">
        <h1
          className="home-intro__name"
          id="home-intro-title"
          aria-label={`${portfolio.firstName} ${portfolio.lastName}`}
        >
          {[portfolio.firstName, portfolio.lastName].map((name, nameIndex) => (
            <span
              className="home-intro__word-mask"
              key={nameIndex}
              aria-hidden="true"
            >
              <span className="home-intro__word">
                {Array.from(name).map((letter, letterIndex) => (
                  <span className="home-intro__letter" key={letterIndex}>
                    <span className="home-intro__letter-content">{letter}</span>
                  </span>
                ))}
              </span>
            </span>
          ))}
        </h1>
        <div className="home-intro__information">
          <div className="home-intro__description">
            <p className="home-intro__description-content">
              <span>{portfolio.role}</span>
              {portfolio.introduction.map((line) => (
                <span key={line}>{line}</span>
              ))}
            </p>
          </div>
          <div className="home-intro__availability">
            <Link
              className="home-intro__availability-link"
              to={routePaths.contact}
            >
              {portfolio.availability}
              <span
                className="home-intro__availability-dot"
                aria-hidden="true"
              />
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}
