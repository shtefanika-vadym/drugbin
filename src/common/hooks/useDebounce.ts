import { useEffect, useRef } from 'react'
export const useDebounce = (callback: (props?: any) => void, delay: number) => {
  const latestCallback = useRef<((props?: any) => void) | undefined>(undefined)
  const latestTimeout = useRef<NodeJS.Timeout | undefined>(undefined)

  useEffect(() => {
    latestCallback.current = callback
  }, [callback])

  return (props?: any) => {
    if (latestTimeout.current) {
      clearTimeout(latestTimeout.current)
    }

    latestTimeout.current = setTimeout(() => {
      latestCallback.current!(props)
    }, delay)
  }
}
