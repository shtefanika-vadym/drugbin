import { useAppDispatch, useAppSelector } from 'store/hooks'

import { SET_TYPE } from 'features/Recycle/slices/recycleSlice'

import { Selected, SwitchButtonContent } from './SwitchButton.styled'

export const SwitchButton = () => {
  const dispatch = useAppDispatch()
  const { type } = useAppSelector((state) => state.recycleReducer)

  return (
    <SwitchButtonContent>
      <Selected isActive={type === 'manual'} onClick={() => dispatch(SET_TYPE('manual'))}>
        Manual
      </Selected>
      <Selected isActive={type === 'automatic'} onClick={() => dispatch(SET_TYPE('automatic'))}>
        Automatic
      </Selected>
    </SwitchButtonContent>
  )
}
