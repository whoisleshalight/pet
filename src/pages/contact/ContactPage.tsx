import { portfolio } from '../../config/portfolio'

export function ContactPage() {
  return (
    <section className="content-page" aria-labelledby="contact-title">
      <p className="eyebrow">
        Contact <span className="status-dot" aria-hidden="true" />
      </p>
      <h1 id="contact-title">
        Let’s make
        <br />
        something great.
      </h1>
      <p className="content-page__description">
        Have an idea, a question, or a project in mind? Let’s start a
        conversation.
      </p>
      <a
        className="text-link content-page__link"
        href={`mailto:${portfolio.emailAddress}`}
      >
        {portfolio.emailAddress} <span aria-hidden="true">↗</span>
      </a>
    </section>
  )
}
