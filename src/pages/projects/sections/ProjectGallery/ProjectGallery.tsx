import { useRef } from 'react'
import { Link } from 'react-router'
import { routePaths } from '../../../../app/router/routePaths'
import { ArrowLink } from '../../../../components/ui/ArrowLink'
import { useProjectGalleryScroll } from './hooks/useProjectGalleryScroll'
import { projectItems } from './projectItems'
import styles from './ProjectGallery.module.scss'

export function ProjectGallery() {
  const sectionReference = useRef<HTMLElement>(null)
  const viewportReference = useRef<HTMLDivElement>(null)
  const trackReference = useRef<HTMLDivElement>(null)

  useProjectGalleryScroll(sectionReference, viewportReference, trackReference)

  return (
    <section
      ref={sectionReference}
      className={styles.projectGallery}
      aria-labelledby="projects-title"
    >
      <div ref={viewportReference} className={styles.viewport}>
        <div ref={trackReference} className={styles.track}>
          <div className={styles.introduction}>
            <h1 id="projects-title" className={styles.title}>
              <span className={styles.titleLine}>Our</span>
              <span className={styles.titleLine}>Projects</span>
            </h1>
            <p className={styles.projectCount}>
              <span className={styles.accessibleText}>Number of projects: </span>
              ({projectItems.length})
            </p>
          </div>

          <div className={styles.projects}>
            {projectItems.map((project, projectIndex) => {
              const projectPath = `${routePaths.projects}/${project.slug}`
              const titleId = `project-${project.slug}`

              return (
                <article
                  key={project.slug}
                  className={styles.project}
                  aria-labelledby={titleId}
                >
                  <Link
                    className={styles.imageLink}
                    to={projectPath}
                    aria-label={`View ${project.title} case study`}
                  >
                    <img
                      className={styles.projectImage}
                      src={project.image}
                      srcSet={`${project.image} 768w, ${project.imageLarge} 1536w`}
                      sizes="(min-width: 1200px) and (min-height: 600px) and (prefers-reduced-motion: no-preference) 100svh, (min-width: 661px) min(760px, 100vw - 80px), calc(100vw - 40px)"
                      width={1536}
                      height={1536}
                      alt={project.imageAlt}
                      loading={projectIndex === 0 ? 'eager' : 'lazy'}
                      decoding="async"
                    />
                  </Link>

                  <div className={styles.projectDetails}>
                    <div className={styles.projectText}>
                      <p className={styles.category}>{project.category}</p>
                      <h2 id={titleId} className={styles.projectTitle}>
                        {project.title}
                      </h2>
                      <p className={styles.description}>{project.description}</p>
                    </div>

                    <ArrowLink
                      className={styles.caseStudyLink}
                      to={projectPath}
                      aria-label={`${project.title} — Case Study`}
                    >
                      Case Study
                    </ArrowLink>
                  </div>
                </article>
              )
            })}
          </div>
        </div>
      </div>
    </section>
  )
}
