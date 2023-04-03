import { useEffect } from 'react'

const useOnClickOutside = (ref: React.RefObject<HTMLElement>, callback: () => void) => {
  useEffect(() => {
    const handleClickAction = (event: MouseEvent | TouchEvent) => {
      if (!ref?.current?.contains(event.target as HTMLElement)) {
        callback()
      }
    }

    document.addEventListener('mousedown', handleClickAction)
    document.addEventListener('touchstart', handleClickAction)
    return () => {
      document.removeEventListener('mousedown', handleClickAction)
      document.removeEventListener('touchstart', handleClickAction)
    }
  }, [callback, ref])
}

export default useOnClickOutside
