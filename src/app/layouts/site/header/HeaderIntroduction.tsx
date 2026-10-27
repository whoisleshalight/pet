import './HeaderIntroduction.scss'
import { Link } from 'react-router'
import { routePaths } from '../../../router/routePaths'
import { portfolio } from '../../../../config/portfolio'
import { getAnimatedLetters } from './getAnimatedLetters'

export function HeaderIntroduction() {
  return (
    <>
      <div className="siteHeaderTitle">
        <h1
          className="siteHeaderName"
          aria-label={`${portfolio.firstName} ${portfolio.lastName}`}
        >
          {[portfolio.firstName, portfolio.lastName].map((name, nameIndex) => (
            <span
              className="siteHeaderWordMask"
              key={nameIndex}
              aria-hidden="true"
            >
              <span className="siteHeaderWord">
                {getAnimatedLetters(name).map((letter, letterIndex) => (
                  <span className="siteHeaderLetter" key={letterIndex}>
                    <span className="siteHeaderLetterContent">
                      <span className="siteHeaderLetterReveal">{letter}</span>
                    </span>
                  </span>
                ))}
              </span>
            </span>
          ))}
        </h1>
      </div>
      <div className="siteHeaderDescription">
        <p className="siteHeaderDescriptionContent">
          <span>{portfolio.role}</span>
          {portfolio.introduction.map((line) => (
            <span key={line}>{line}</span>
          ))}
        </p>
      </div>
      <div className="siteHeaderAvailability">
        <Link className="siteHeaderAvailabilityLink" to={routePaths.contact}>
          {portfolio.availability}
          <span className="siteHeaderAvailabilityDot" aria-hidden="true" />
        </Link>
      </div>
    </>
  )
}
