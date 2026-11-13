function waitForImage(
  image: HTMLImageElement,
  signal: AbortSignal,
): Promise<void> {
  if (image.complete || signal.aborted) {
    return Promise.resolve()
  }

  return new Promise((resolve) => {
    function finish() {
      image.removeEventListener('load', finish)
      image.removeEventListener('error', finish)
      signal.removeEventListener('abort', finish)
      resolve()
    }

    // A failed image must leave the page accessible, just like a loaded image.
    image.addEventListener('load', finish, { once: true })
    image.addEventListener('error', finish, { once: true })
    signal.addEventListener('abort', finish, { once: true })
  })
}

function isInViewport(element: Element): boolean {
  const bounds = element.getBoundingClientRect()

  return bounds.top < window.innerHeight && bounds.bottom > 0
}

export function getInitialPageResources(signal: AbortSignal): Promise<unknown>[] {
  const images = Array.from(document.images).filter((image) => {
    return image.hasAttribute('src') && isInViewport(image)
  })
  const videos = Array.from(document.querySelectorAll('video[poster]'))
    .filter(isInViewport)
  const posterImages = videos.map((video) => {
    const poster = new Image()
    poster.src = video.getAttribute('poster') ?? ''
    return poster
  })

  // Posters are sufficient for background videos; do not download entire videos
  // or below-the-fold lazy images before letting the visitor use the page.
  return [
    document.fonts.ready,
    ...images.map((image) => waitForImage(image, signal)),
    ...posterImages.map((poster) => waitForImage(poster, signal)),
  ]
}
