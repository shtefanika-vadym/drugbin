import editIcon from 'common/assets/icons/edit.svg'
import deleteIcon from 'common/assets/icons/trash.svg'

import { Button } from 'common/components/Button/Button'

import { Container, Icon } from './QuickActions.styled'

export const QuickActions = () => {
  return (
    <Container>
      <Button variant='square' size='S-square'>
        <Icon src={editIcon} />
      </Button>
      <Button variant='square' size='S-square'>
        <Icon src={deleteIcon} />
      </Button>
    </Container>
  )
}
