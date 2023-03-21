import type { FC } from 'react'
import { Fragment } from 'react'

import { UtilService } from 'common/services/utilService'

interface IProps {
  total: number
  children: JSX.Element
}
export const ArrayElements: FC<IProps> = ({ total, children }) => (
  <>
    {UtilService.getFilledArray(total).map(
      (_, index: number): JSX.Element => (
        <Fragment key={index}>{children}</Fragment>
      ),
    )}
  </>
)
