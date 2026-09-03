import { useEffect, useId, useRef, useState } from 'react'
import { useOnClickOutside } from 'usehooks-ts'
import { Option, Popover, Root, Trigger } from './SelectMenu.styled'

export interface SelectMenuOption {
  value: string
  label: string
}

interface Props {
  /** Accessible name for the trigger (toolbar controls have no visible label). */
  ariaLabel: string
  value: string
  options: SelectMenuOption[]
  onChange: (value: string) => void
  /** Popover edge alignment — use `right` when the control sits near the viewport edge. */
  align?: 'left' | 'right'
  /** Applied to the root so callers can width the control. */
  className?: string
}

const Chevron = () => (
  <svg viewBox='0 0 12 12' fill='none' aria-hidden='true'>
    <path d='M3 4.5 6 8l3-3.5' stroke='currentColor' strokeWidth='1.4' strokeLinecap='round' />
  </svg>
)
const Check = () => (
  <svg viewBox='0 0 12 12' fill='none' aria-hidden='true'>
    <path
      d='m2.5 6.5 2.5 2.5 4.5-5'
      stroke='currentColor'
      strokeWidth='1.6'
      strokeLinecap='round'
      strokeLinejoin='round'
    />
  </svg>
)

/**
 * Compact single-select dropdown. Unlike a native `<select>` the height is fully controlled and
 * the option list is styled; the popover is absolutely positioned so opening it never reflows the
 * page. Keyboard: Space/Enter/↓ opens, ↑/↓ move, Enter selects, Esc closes.
 */
export const SelectMenu: React.FC<Props> = ({
  ariaLabel,
  value,
  options,
  onChange,
  align = 'left',
  className,
}) => {
  const [open, setOpen] = useState(false)
  const [active, setActive] = useState(0)
  const rootRef = useRef<HTMLDivElement>(null)
  const listId = useId()

  const selectedIndex = Math.max(
    0,
    options.findIndex((o) => o.value === value),
  )
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
    if (!open) {
      if (e.key === 'ArrowDown' || e.key === 'Enter' || e.key === ' ') {
        e.preventDefault()
        setOpen(true)
      }
      return
    }
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
    <Root ref={rootRef} className={className}>
      <Trigger
        type='button'
        $open={open}
        aria-label={ariaLabel}
        aria-haspopup='listbox'
        aria-expanded={open}
        aria-controls={open ? listId : undefined}
        onClick={() => setOpen((o) => !o)}
        onKeyDown={onKeyDown}>
        <span>{current?.label}</span>
        <Chevron />
      </Trigger>
      {open && (
        <Popover role='listbox' id={listId} aria-label={ariaLabel} $align={align}>
          {options.map((o, i) => (
            <Option
              key={o.value || '__all__'}
              role='option'
              aria-selected={o.value === value}
              $selected={o.value === value}
              $active={i === active}
              onMouseEnter={() => setActive(i)}
              onClick={() => choose(i)}>
              <Check />
              {o.label}
            </Option>
          ))}
        </Popover>
      )}
    </Root>
  )
}
