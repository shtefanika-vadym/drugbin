import type { FC } from 'react'

import done from 'common/assets/icons/done.svg'
import editIcon from 'common/assets/icons/edit.svg'
import eye from 'common/assets/icons/eye-table.svg'
import deleteIcon from 'common/assets/icons/trash.svg'

import { Button } from 'common/components/Button/Button'

import { Container, Icon } from './QuickActions.styled'

interface IQuickActionsProps {
  id: string
  variant?: string
}

export const QuickActions: FC<IQuickActionsProps> = ({ id, variant = 'pharmacy' }) => {
  console.log(id)
  return (
    <Container>
      {variant === 'pharmacy' ? (
        <>
          <Button variant='square' size='S-square'>
            <Icon src={editIcon} />
          </Button>
          <Button variant='square' size='S-square'>
            <Icon src={deleteIcon} />
          </Button>
        </>
      ) : (
        <>
          <Button variant='square' size='S-square'>
            <Icon src={eye} />
          </Button>
          <Button variant='square' size='S-square'>
            <Icon src={done} />
          </Button>
        </>
      )}
    </Container>
  )
}
