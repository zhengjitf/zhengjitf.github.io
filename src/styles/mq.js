import facepaint from 'facepaint'

const breakpoints = [768, 992, 1200]

export const mq = facepaint(
  breakpoints.map(bp => `@media (min-width: ${bp}px)`)
)
