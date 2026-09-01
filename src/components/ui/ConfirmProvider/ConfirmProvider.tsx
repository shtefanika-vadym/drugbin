import { WDS_COLOR_RED, WDS_COLOR_WHITE } from 'common/styles/colors'
import { Button } from 'components/ui/Button/Button'
import { DialogContainer, DialogContent } from 'components/ui/Dialog/Dialog.styled'
import { Spinner } from 'components/ui/Spinner/Spinner'
import { Text } from 'components/ui/Text/Text'
import { WDS_Z_INDEX_TOAST } from 'common/styles/tokens/layers'
import React, { createContext, useCallback, useContext, useEffect, useRef, useState } from 'react'
import { Actions, Body, Description } from './ConfirmProvider.styled'

export interface ConfirmOptions {
  title: string
  description?: string
  confirmLabel?: string
  cancelLabel?: string
  /** Render the confirm button in the destructive (red) style. */
  danger?: boolean
  /**
   * Run this when the user confirms, WITH the dialog kept open and a spinner in the confirm button.
   * The dialog closes (and `confirm()` resolves `true`) only when it succeeds; on failure the
   * dialog stays open showing the error. Without it the dialog closes immediately on confirm.
   */
  action?: () => Promise<unknown>
}

type ConfirmFn = (options: ConfirmOptions) => Promise<boolean>

const ConfirmContext = createContext<ConfirmFn>(() => Promise.resolve(false))

/** `const confirm = useConfirm()` → `if (!(await confirm({ title, danger: true }))) return`. */
export const useConfirm = () => useContext(ConfirmContext)

const errText = (e: any) => e?.response?.data?.message || e?.message || 'Acțiunea a eșuat.'

/**
 * One app-level confirmation dialog, promise-based. Uses the kit's `Dialog` shell so it looks
 * identical to a real dialog, and renders above everything — including an open detail dialog. The
 * mousedown is stopped at the React root so the dialog underneath (whose close-on-click-outside
 * listens on `window`) does not treat a click on the confirm as a click outside itself.
 */
export const ConfirmProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [options, setOptions] = useState<ConfirmOptions | null>(null)
  const [running, setRunning] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const resolver = useRef<((value: boolean) => void) | null>(null)

  const confirm = useCallback<ConfirmFn>((next) => {
    setOptions(next)
    setRunning(false)
    setError(null)
    return new Promise<boolean>((resolve) => {
      resolver.current = resolve
    })
  }, [])

  const settle = useCallback((value: boolean) => {
    resolver.current?.(value)
    resolver.current = null
    setOptions(null)
    setRunning(false)
    setError(null)
  }, [])

  const cancel = useCallback(() => {
    if (!running) settle(false)
  }, [running, settle])

  const accept = useCallback(async () => {
    if (running) return
    if (!options?.action) {
      settle(true)
      return
    }
    setRunning(true)
    setError(null)
    try {
      await options.action()
      settle(true)
    } catch (e) {
      setError(errText(e))
      setRunning(false)
    }
  }, [running, options, settle])

  useEffect(() => {
    if (!options) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') cancel()
      else if (e.key === 'Enter') accept()
    }
    document.addEventListener('keydown', onKey)
    return () => document.removeEventListener('keydown', onKey)
  }, [options, cancel, accept])

  return (
    <ConfirmContext.Provider value={confirm}>
      {children}
      {options && (
        <DialogContainer
          zIndex={WDS_Z_INDEX_TOAST + 1}
          onMouseDown={(e) => {
            // A dialog may sit underneath; its close-on-click-outside listens on `window`. Stopping
            // the native event here keeps a click on the confirm from closing that dialog too.
            e.nativeEvent.stopPropagation()
            if (e.target === e.currentTarget) cancel()
          }}>
          <DialogContent>
            <Body>
              <Text variant='titleH4'>{options.title}</Text>
              {options.description && <Description>{options.description}</Description>}
              {error && (
                <Text variant='bodyS' color={WDS_COLOR_RED}>
                  {error}
                </Text>
              )}
              <Actions>
                <Button variant='secondary' disabled={running} onClick={cancel}>
                  {options.cancelLabel ?? 'Anulare'}
                </Button>
                <Button variant={options.danger ? 'danger' : 'primary'} disabled={running} onClick={accept}>
                  {running ? (
                    <Spinner size={16} color={options.danger ? WDS_COLOR_RED : WDS_COLOR_WHITE} />
                  ) : (
                    options.confirmLabel ?? 'Confirmă'
                  )}
                </Button>
              </Actions>
            </Body>
          </DialogContent>
        </DialogContainer>
      )}
    </ConfirmContext.Provider>
  )
}
