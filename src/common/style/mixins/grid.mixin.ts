import { isNil } from 'lodash-es'

interface Grid {
  gridTemplateColumns?: string
  gridTemplateRows?: string
  gridTemplateAreas?: string
  rowGap?: string
  columnGap?: string
}

export const grid = ({
  gridTemplateRows,
  gridTemplateColumns,
  gridTemplateAreas,
  rowGap,
  columnGap,
}: Grid): string => `
  display: grid;
  ${gridTemplateColumns ? `grid-template-columns: ${gridTemplateColumns};` : ''}
  ${gridTemplateRows ? `grid-template-rows: ${gridTemplateRows};` : ''}
  ${gridTemplateAreas ? `grid-template-areas: ${gridTemplateAreas};` : ''}
  ${rowGap ? `row-gap: ${rowGap};` : ''}
  ${columnGap ? `column-gap: ${columnGap};` : ''}
`

interface GridPlace {
  columnStart?: number | string
  columnEnd?: number | string
  rowEnd?: number | string
  rowStart?: number | string
}

export const placeInGrid = ({ columnStart, columnEnd, rowEnd, rowStart }: GridPlace) => `
   ${!isNil(columnStart) ? `grid-column-start: ${columnStart}` : ''};
   ${!isNil(columnEnd) ? `grid-column-end: ${columnEnd}` : ''};
   ${!isNil(rowStart) ? `grid-row-start: ${rowStart}` : ''};
   ${!isNil(rowEnd) ? `grid-row-end: ${rowEnd}` : ''};
`
