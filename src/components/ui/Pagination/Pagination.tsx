import { range } from 'lodash-es'
import React, { useCallback } from 'react'
import { Container, Tile } from './Pagination.styled'
import { ChevronDown, ChevronUp } from '../Icon'

export interface PaginationProps {
  current: number
  total: number
  maxVisible?: number
  onChange: (newPage: number) => void
}
export const Pagination: React.FC<PaginationProps> = ({
  current,
  total,
  maxVisible = 5,
  onChange,
}) => {
  const { min, max } = getMinMax(current, total, maxVisible)
  const tiles = range(min, max)

  const handlePrev = useCallback(
    (ev?: React.MouseEvent<HTMLButtonElement>) => {
      ev?.preventDefault()
      onChange(current - 1)
    },
    [onChange, current],
  )
  const handleNext = useCallback(
    (ev?: React.MouseEvent<HTMLButtonElement>) => {
      ev?.preventDefault()
      onChange(current + 1)
    },
    [onChange, current],
  )

  return (
    <Container>
      <Tile disabled={current === 1} onClick={handlePrev}>
        <ChevronDown className={'rotate'} />
      </Tile>
      {tiles.map((t) => (
        <PageTile key={t} active={current === t} value={t} onChange={onChange} />
      ))}
      <Tile disabled={current === total - 1} onClick={handleNext}>
        <ChevronUp className='rotate' color='red' fill='red'/>
      </Tile>
    </Container>
  )
}
const getMinMax = (current: number, total: number, maxVisible: number) => {
  let min = Math.max(current - maxVisible, 1)
  let max = Math.min(current + maxVisible, total)
  if (max - min > maxVisible) {
    min = Math.max(current - Math.floor(maxVisible / 2), 1)
    max = Math.min(min + maxVisible, total)
  }
  return {
    min,
    max,
  }
}

interface PageTileProps {
  value: number
  active: boolean
  onChange: (newPage: number) => void
}
const PageTile: React.FC<PageTileProps> = ({ value, active, onChange }) => {
  const handleClick = useCallback(
    (ev?: React.MouseEvent<HTMLButtonElement>) => {
      ev?.preventDefault()
      if (!active) onChange(value)
    },
    [active, onChange, value],
  )

  return (
    <Tile active={active} onClick={handleClick}>
      {value}
    </Tile>
  )
}
