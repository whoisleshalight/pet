export type CursorAppearance =
  | { mode: 'hidden' | 'default' | 'link' }
  | { mode: 'label'; label: string }

const actionSelector = [
  'a[href]',
  'button',
  '[role="button"]',
  '[role="scrollbar"]',
  'summary',
  'input[type="submit"]',
  'input[type="button"]',
  'input[type="image"]',
].join(', ')

const interactiveSelector = `[data-cursor-label], ${actionSelector}`

const nativeCursorSelector = [
  '[data-cursor="hidden"]',
  'input:not([type="submit"]):not([type="button"]):not([type="image"])',
  'textarea',
  'select',
  'iframe',
  'video[controls]',
  'audio[controls]',
  ':disabled',
  // Placeholder links retain the same cursor treatment as other text links.
  '[aria-disabled="true"]:not(a[href])',
].join(', ')

export function getCursorAppearance(element: Element | null): CursorAppearance {
  if (!element || element.closest(nativeCursorSelector)) {
    return { mode: 'hidden' }
  }

  const editableElement = element.closest('[contenteditable]')

  if (editableElement instanceof HTMLElement && editableElement.isContentEditable) {
    return { mode: 'hidden' }
  }

  const interactiveElement = element.closest(interactiveSelector)

  if (!interactiveElement) {
    return { mode: 'default' }
  }

  const label = interactiveElement.getAttribute('data-cursor-label')?.trim()

  if (label) {
    return { mode: 'label', label }
  }

  if (interactiveElement.matches(actionSelector)) {
    return { mode: 'link' }
  }

  return { mode: 'default' }
}
