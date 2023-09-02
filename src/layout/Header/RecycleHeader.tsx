import { useNavigate } from 'react-router-dom'

import type { HeaderProps } from './HeaderWrapper'

import closeIcon from 'common/assets/close.svg'
import logoS from 'common/assets/logo-s.svg'

import { ContainerWrapperRecycle, Content, Icon } from './Header.styled'

export const RecycleHeader: React.FC<HeaderProps> = ({ children }) => {
  const navigate = useNavigate()
  return (
    <div>
      <ContainerWrapperRecycle>
        <Icon src={logoS} />
        <Icon src={closeIcon} onClick={() => navigate('/')} />
      </ContainerWrapperRecycle>
      <Content>{children}</Content>
    </div>
  )
}
