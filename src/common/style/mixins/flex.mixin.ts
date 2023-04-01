export interface Flex {
  direction?: 'row' | 'column' | 'row-reverse' | 'column-reverse'
  alignItems?:
    | 'stretch'
    | 'flex-start'
    | 'flex-end'
    | 'center'
    | 'baseline'
    | 'first baseline'
    | 'last baseline'
    | 'start'
    | 'end'
    | 'self-start'
    | 'self-end'
  alignContent?: 'flex-start' | 'flex-end' | 'center' | 'space-between' | 'space-around' | 'stretch'
  justifyContent?:
    | 'flex-start'
    | 'flex-end'
    | 'center'
    | 'space-between'
    | 'space-around'
    | 'space-evenly'
  flexWrap?: 'nowrap' | 'wrap' | 'wrap-reverse'
  gap?: string
}

export const flex = ({
  direction,
  alignItems,
  alignContent,
  justifyContent,
  flexWrap,
  gap,
}: Flex): string => `
    display: flex;
    ${`flex-direction: ${direction || 'row'};`}
    ${alignItems ? `align-items: ${alignItems};` : ''}
    ${alignContent ? `align-content: ${alignContent};` : ''}
    ${justifyContent ? `justify-content: ${justifyContent};` : ''}
    ${flexWrap ? `flex-wrap: ${flexWrap};` : ''}
    ${gap ? `gap: ${gap};` : ''}
  `
