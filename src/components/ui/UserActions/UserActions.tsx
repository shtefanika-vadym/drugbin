import { useAuth } from 'app/providers'
import { WDS_COLOR_BLUE_700, WDS_COLOR_RED } from 'common/style/colors'
import { useCallback, useRef } from 'react'
import { useOnClickOutside, useToggle } from 'usehooks-ts'
import { Button } from '../Button/Button'
import { LogoutIcon, UserIcon } from '../Icon'
import { Text } from '../Text/Text'
import { Border, Menu, MenuActions } from './UserActions.styled'

const reportURL =
  'https://docs.google.com/forms/d/e/1FAIpQLSfe3upiDR3EZDoWvj0EnKWAjXfWvSoKKbKdV7WGCrJdeNtxOg/viewform?usp=sf_link'

export const UserActions = () => {
  const containerRef = useRef(null)
  const [value, toggle, setValue] = useToggle(false)

  const { logout } = useAuth()

  const handleClose = useCallback(() => {
    setValue(false)
  }, [setValue])

  const handleReport = useCallback(() => {
    window.open(reportURL, '_blank')
  }, [])

  useOnClickOutside(containerRef, handleClose)

  return (
    <div ref={containerRef}>
      <Button variant='white' size='XS' onClick={toggle}>
        <UserIcon width={16} height={16} />
        <Text textVariant='bodyS' color={WDS_COLOR_BLUE_700}>
          Spitalul Judetean Suceava
        </Text>
      </Button>
      {value && (
        <Menu>
          <MenuActions onClick={handleReport}>
            <Text textVariant='bodyM'>Raportați o problemă</Text>
          </MenuActions>
          <Border />
          <MenuActions onClick={logout}>
            <LogoutIcon width={16} height={16} />
            <Text textVariant='subheading' color={WDS_COLOR_RED}>
              Deconectați-vă
            </Text>
          </MenuActions>
        </Menu>
      )}
    </div>
  )
}
