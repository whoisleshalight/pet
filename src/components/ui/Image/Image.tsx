import { useCallback, useContext, useState } from 'react'
import type { ComponentPropsWithRef, CSSProperties } from 'react'
import { DeferredResourcesContext } from '../../../app/preloader/DeferredResourcesContext'
import styles from './Image.module.scss'

interface ImageProps extends Omit<ComponentPropsWithRef<'img'>, 'loading'> {
  frameClassName?: string
  fill?: boolean
  priority?: boolean
}

export function Image({
  frameClassName,
  fill = false,
  priority = false,
  className,
  src,
  srcSet,
  ref,
  onLoad,
  onError,
  width,
  height,
  decoding = 'async',
  ...imageProps
}: ImageProps) {
  const canLoadDeferredResources = useContext(DeferredResourcesContext)
  const shouldLoad = priority || canLoadDeferredResources
  const sourceKey = `${src ?? ''}|${srcSet ?? ''}`
  const [settledImage, setSettledImage] = useState<{
    sourceKey: string
    status: 'loaded' | 'error'
  } | null>(null)
  const status = settledImage?.sourceKey === sourceKey
    ? settledImage.status
    : 'loading'
  const frameStyle: CSSProperties = {}

  // Cropped images use their section's frame geometry instead of their source ratio.
  if (!fill && !frameClassName && Number(width) > 0 && Number(height) > 0) {
    frameStyle.aspectRatio = `${width} / ${height}`
  }

  const handleImageReference = useCallback((image: HTMLImageElement | null) => {
    if (typeof ref === 'function') {
      ref(image)
    } else if (ref) {
      ref.current = image
    }

    // Cached images can finish before React attaches the load listener.
    if (image?.complete && image.currentSrc) {
      setSettledImage({
        sourceKey,
        status: image.naturalWidth > 0 ? 'loaded' : 'error',
      })
    }
  }, [ref, sourceKey])

  return (
    <span
      className={`${styles.frame}${fill ? ` ${styles.fill}` : ''}${frameClassName ? ` ${frameClassName}` : ''}`}
      style={frameStyle}
      data-image-state={status}
      aria-busy={status === 'loading'}
    >
      <img
        {...imageProps}
        ref={handleImageReference}
        className={`${styles.image}${className ? ` ${className}` : ''}`}
        data-image-state={status}
        src={shouldLoad ? src : undefined}
        srcSet={shouldLoad ? srcSet : undefined}
        loading="eager"
        decoding={decoding}
        width={width}
        height={height}
        onLoad={(event) => {
          setSettledImage({ sourceKey, status: 'loaded' })
          onLoad?.(event)
        }}
        onError={(event) => {
          setSettledImage({ sourceKey, status: 'error' })
          onError?.(event)
        }}
      />
      <span className={styles.loader} aria-hidden="true">
        <span className={styles.spinner} />
      </span>
      {status === 'error' && (
        <span className={styles.errorMessage}>Image unavailable</span>
      )}
    </span>
  )
}
