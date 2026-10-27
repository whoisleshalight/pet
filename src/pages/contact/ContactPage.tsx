import './ContactPage.scss'
import { portfolio } from '../../config/portfolio'

export function ContactPage() {
  return (
    <section className="contactPage" aria-labelledby="contact-title">
      <p className="contactPageLabel">
        Contact <span className="contactPageStatusDot" aria-hidden="true" />
      </p>
      <h1 id="contact-title">
        Let’s make
        <br />
        something great.
      </h1>
      <p className="contactPageDescription">
        Have an idea, a question, or a project in mind? Let’s start a
        conversation.
      </p>
      <a
        className="textLink contactPageLink"
        href={`mailto:${portfolio.emailAddress}`}
      >
        {portfolio.emailAddress} <span aria-hidden="true">↗</span>
      </a>
    </section>
  )
}
