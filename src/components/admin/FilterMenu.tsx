import { useEffect, useId, useRef, useState } from 'react'
import { useOnClickOutside } from 'usehooks-ts'
import {
  FilterMenuRoot,
  FilterOption,
  FilterPopover,
  FilterTrigger,
} from './clasificari.styled'

export interface FilterOptionItem {
  value: string
  label: string
}

interface Props {
  /** Accessible name for the trigger (there's no visible label in the toolbar). */
  ariaLabel: string
  value: string
  options: FilterOptionItem[]
  onChange: (value: string) => void
}

const Chevron = () => (
  <svg viewBox='0 0 12 12' fill='none' aria-hidden='true'>
    <path d='M3 4.5 6 8l3-3.5' stroke='currentColor' strokeWidth='1.4' strokeLinecap='round' />
  </svg>
)
const Check = () => (
  <svg viewBox='0 0 12 12' fill='none' aria-hidden='true'>
    <path d='m2.5 6.5 2.5 2.5 4.5-5' stroke='currentColor' strokeWidth='1.6' strokeLinecap='round' strokeLinejoin='round' />
  </svg>
)

/**
 * Compact single-select dropdown for the Clasificări toolbar filters. A trigger styled to match the
 * segmented control, and an absolutely-positioned popover so opening it never shoves the list down.
 */
export const FilterMenu: React.FC<Props> = ({ ariaLabel, value, options, onChange }) => {
  const [open, setOpen] = useState(false)
  const [active, setActive] = useState(0)
  const rootRef = useRef<HTMLDivElement>(null)
  const listId = useId()

  const selectedIndex = Math.max(0, options.findIndex((o) => o.value === value))
  const current = options[selectedIndex] ?? options[0]

  useOnClickOutside(rootRef, () => setOpen(false))

  useEffect(() => {
    if (open) setActive(selectedIndex)
  }, [open, selectedIndex])

  const choose = (i: number) => {
    onChange(options[i].value)
    setOpen(false)
  }

  const onKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Escape') {
      setOpen(false)
      return
    }
    if (!open && (e.key === 'ArrowDown' || e.key === 'Enter' || e.key === ' ')) {
      e.preventDefault()
      setOpen(true)
      return
    }
    if (!open) return
    if (e.key === 'ArrowDown') {
      e.preventDefault()
      setActive((i) => (i + 1) % options.length)
    } else if (e.key === 'ArrowUp') {
      e.preventDefault()
      setActive((i) => (i - 1 + options.length) % options.length)
    } else if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault()
      choose(active)
    }
  }

  return (
    <FilterMenuRoot ref={rootRef}>
      <FilterTrigger
        type='button'
        $open={open}
        aria-label={ariaLabel}
        aria-haspopup='listbox'
        aria-expanded={open}
        onClick={() => setOpen((o) => !o)}
        onKeyDown={onKeyDown}>
        <span>{current?.label}</span>
        <Chevron />
      </FilterTrigger>
      {open && (
        <FilterPopover role='listbox' id={listId} aria-label={ariaLabel}>
          {options.map((o, i) => (
            <FilterOption
              key={o.value || 'all'}
              role='option'
              aria-selected={o.value === value}
              $selected={o.value === value}
              $active={i === active}
              onMouseEnter={() => setActive(i)}
              onClick={() => choose(i)}>
              <Check />
              {o.label}
            </FilterOption>
          ))}
        </FilterPopover>
      )}
    </FilterMenuRoot>
  )
}
