export function getAnimatedLetters(name: string) {
  const letters: string[] = []

  for (const character of Array.from(name)) {
    // Keep an apostrophe attached to its letter so it does not drift on its own.
    if (/[\u0027\u2019\u02bc]/u.test(character) && letters.length > 0) {
      letters[letters.length - 1] += character
    } else {
      letters.push(character)
    }
  }

  return letters
}
