import { useAuth } from 'common/hooks/auth'
import { useAuthState } from 'common/state/auth.state'
import type { KeyboardEvent, MouseEvent } from 'react'
import { useCallback, useEffect, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useOnClickOutside, useToggle } from 'usehooks-ts'
import { Button } from '../Button/Button'
import { AlertIcon, CheckIcon, ChevronDown, CopyIcon, LogoutIcon, UserIcon } from '../Icon'
import {
  Avatar,
  Chevron,
  Container,
  CopyButton,
  EmailText,
  GroupLabel,
  IdentityCard,
  IdentityEmail,
  IdentityMeta,
  IdentityName,
  IdentityTop,
  Menu,
  MenuItem,
  RolePill,
  Separator,
  TriggerLabel,
} from './UserActions.styled'

const reportURL =
  'https://docs.google.com/forms/d/e/1FAIpQLSfe3upiDR3EZDoWvj0EnKWAjXfWvSoKKbKdV7WGCrJdeNtxOg/viewform?usp=sf_link'

const ROLE_LABEL: Record<string, string> = {
  hospital: 'Spital',
  admin: 'Administrator',
}

const initialsFrom = (source: string): string => {
  const parts = source.trim().split(/\s+/).filter(Boolean)
  if (parts.length === 0) return 'DB'
  if (parts.length === 1) return parts[0].slice(0, 2).toUpperCase()
  return (parts[0][0] + parts[1][0]).toUpperCase()
}

export const UserActions = () => {
  const containerRef = useRef<HTMLDivElement>(null)
  const triggerRef = useRef<HTMLButtonElement>(null)
  const menuRef = useRef<HTMLDivElement>(null)
  const [open, toggle, setOpen] = useToggle(false)
  const [copied, setCopied] = useState(false)
  const navigate = useNavigate()

  const { logout } = useAuth()
  const email = useAuthState((s) => s.email)
  const hospitalName = useAuthState((s) => s.hospitalName)
  const role = useAuthState((s) => s.role)

  const isHospital = role === 'hospital'
  const displayName = hospitalName || email || 'DrugBin'
  const initials = initialsFrom(hospitalName || email || 'DrugBin')
  const roleLabel = role ? ROLE_LABEL[role] : undefined

  const handleClose = useCallback(() => setOpen(false), [setOpen])
  useOnClickOutside(containerRef, handleClose)

  const handleNavigateProfile = useCallback(() => {
    setOpen(false)
    navigate('/profil')
  }, [navigate, setOpen])

  const handleReport = useCallback(() => {
    window.open(reportURL, '_blank')
  }, [])

  const handleCopyEmail = useCallback(
    (event: MouseEvent) => {
      event.stopPropagation()
      if (!email) return
      navigator.clipboard?.writeText(email)
      setCopied(true)
    },
    [email],
  )

  useEffect(() => {
    if (!copied) return
    const id = window.setTimeout(() => setCopied(false), 1200)
    return () => window.clearTimeout(id)
  }, [copied])

  useEffect(() => {
    if (!open) return
    const first = menuRef.current?.querySelector<HTMLElement>('[role="menuitem"]')
    first?.focus()
  }, [open])

  const handleMenuKeyDown = useCallback(
    (event: KeyboardEvent<HTMLDivElement>) => {
      if (event.key === 'Escape') {
        event.preventDefault()
        setOpen(false)
        triggerRef.current?.focus()
        return
      }
      if (event.key !== 'ArrowDown' && event.key !== 'ArrowUp') return
      event.preventDefault()
      const items = Array.from(
        menuRef.current?.querySelectorAll<HTMLElement>('[role="menuitem"]') ?? [],
      )
      if (items.length === 0) return
      const current = items.indexOf(document.activeElement as HTMLElement)
      const delta = event.key === 'ArrowDown' ? 1 : -1
      items[(current + delta + items.length) % items.length].focus()
    },
    [setOpen],
  )

  const handleTriggerKeyDown = useCallback(
    (event: KeyboardEvent<HTMLButtonElement>) => {
      if (event.key === 'ArrowDown') {
        event.preventDefault()
        setOpen(true)
      }
    },
    [setOpen],
  )

  return (
    <Container ref={containerRef}>
      <Button
        ref={triggerRef}
        variant='white'
        size='XS'
        onClick={toggle}
        onKeyDown={handleTriggerKeyDown}
        aria-haspopup='menu'
        aria-expanded={open}>
        <Avatar size={20}>{initials}</Avatar>
        <TriggerLabel>{displayName}</TriggerLabel>
        <Chevron open={open}>
          <ChevronDown width={14} height={14} />
        </Chevron>
      </Button>

      {open && (
        <Menu ref={menuRef} role='menu' aria-label='Meniu utilizator' onKeyDown={handleMenuKeyDown}>
          <IdentityCard>
            <Avatar size={40}>{initials}</Avatar>
            <IdentityMeta>
              <IdentityTop>
                <IdentityName>{displayName}</IdentityName>
                {roleLabel && <RolePill>{roleLabel}</RolePill>}
              </IdentityTop>
              {email && (
                <IdentityEmail>
                  <EmailText>{email}</EmailText>
                  <CopyButton
                    type='button'
                    onClick={handleCopyEmail}
                    aria-label='Copiați adresa de e-mail'>
                    {copied ? (
                      <CheckIcon width={13} height={13} />
                    ) : (
                      <CopyIcon width={13} height={13} />
                    )}
                  </CopyButton>
                </IdentityEmail>
              )}
            </IdentityMeta>
          </IdentityCard>

          <Separator />

          {isHospital && (
            <>
              <GroupLabel>Cont</GroupLabel>
              <MenuItem type='button' role='menuitem' onClick={handleNavigateProfile}>
                <UserIcon width={16} height={16} />
                Profilul spitalului
              </MenuItem>
            </>
          )}

          <GroupLabel>Suport</GroupLabel>
          <MenuItem type='button' role='menuitem' onClick={handleReport}>
            <AlertIcon width={16} height={16} />
            Raportați o problemă
          </MenuItem>

          <Separator />

          <MenuItem type='button' role='menuitem' danger onClick={logout}>
            <LogoutIcon width={16} height={16} />
            Deconectați-vă
          </MenuItem>
        </Menu>
      )}
    </Container>
  )
}
