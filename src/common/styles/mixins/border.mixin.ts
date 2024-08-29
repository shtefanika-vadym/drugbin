export interface Border {
  color: string
  width?: string
  type?: 'solid' | 'dashed' | 'dotted' | 'doubled' | 'ridge'
  variant?: 'top' | 'left' | 'right' | 'bottom'
  inside?: boolean
}

export const border = ({ width = '1px', type = 'solid', color, variant, inside }: Border): string =>
  inside
    ? `box-shadow: 0px 0px 0px ${width} ${color} border: none`
    : `border${variant ? `-${variant}` : ''}: ${width} ${type} ${color}`
