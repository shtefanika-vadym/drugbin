import { useGetEntriesQuery } from 'api/management'
import { useUpdateStatusMutation } from 'api/statusApi'
import { useGetCurrentPage } from 'common/hooks/useGetCurrentPage'
import { WDS_COLOR_BLUE_700, WDS_COLOR_GREEN_200, WDS_COLOR_GREY } from 'common/style/colors'
import { UnitType } from 'common/utils/consts'
import { Button } from 'components/ui/Button/Button'
import { CheckIcon } from 'components/ui/Icon'
import { Input } from 'components/ui/Input/Input'
import Modal from 'components/ui/Modal/Modal'
import { Text } from 'components/ui/Text/Text'
import { ChangeEvent, useCallback, useMemo, useState } from 'react'
import {
  BoxIcon,
  ButtonWrapper,
  Container,
  Content,
  UnitButton,
  WeightWrapper,
} from './StatusModal.styled'

interface ApproveModalProps {
  handleCloseModal: () => void
  id: number
  refetch?: () => void
}

export const ApproveModal = ({ handleCloseModal, id }: ApproveModalProps) => {
  const [updateStatus, { isLoading }] = useUpdateStatusMutation()
  const [weight, setWeight] = useState(null)
  const [unit, setUnit] = useState<UnitType>(UnitType.GRAM)
  const [isFieldTouched, setIsFieldTouched] = useState(false)
  const isValidWeight = useMemo(() => weight > 0, [weight])

  const currentPage = useGetCurrentPage()
  const { refetch } = useGetEntriesQuery(currentPage)

  const handleUpdateStatus = useCallback(async () => {
    if (id) await updateStatus(id)
    if (!isLoading) handleCloseModal()
    refetch()
  }, [handleCloseModal, id, isLoading, refetch, updateStatus])

  const handleUnitChange = useCallback((unit: UnitType) => {
    setUnit(unit)
  }, [])

  const handleWeightChange = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target
    setWeight(value)
  }, [])

  const handleTouch = useCallback(() => {
    event.preventDefault()
    setIsFieldTouched(true)
  }, [])

  return (
    <Modal callbackOnClose={handleCloseModal}>
      <Container>
        <BoxIcon color={WDS_COLOR_GREEN_200}>
          <CheckIcon />
        </BoxIcon>
        <Content>
          <Text textVariant='titleH5' color={WDS_COLOR_BLUE_700}>
            Sunteți sigur că doriți să aprobați această cerere de colectare?
          </Text>
          <Text textVariant='bodyS' color={WDS_COLOR_GREY}>
            Aceasta este o acțiune ireversibilă care va duce la aprobarea cererii de colectare în
            sistemul DrugBin.
          </Text>
          <WeightWrapper>
            <Input
              type='number'
              label='Greutate*'
              placeholder='Ex. 120'
              value={weight}
              onChange={handleWeightChange}
              onBlur={handleTouch}
              valid={!isFieldTouched || isValidWeight}
            />
            <UnitButton
              variant='secondary'
              size='S'
              isActive={unit === UnitType.GRAM}
              onClick={() => handleUnitChange(UnitType.GRAM)}>
              g
            </UnitButton>
            <UnitButton
              variant='secondary'
              size='S'
              isActive={unit === UnitType.KILOGRAM}
              onClick={() => handleUnitChange(UnitType.KILOGRAM)}>
              kg
            </UnitButton>
          </WeightWrapper>
        </Content>
      </Container>
      <ButtonWrapper>
        <Button variant='secondary' onClick={handleCloseModal}>
          Anulare
        </Button>
        <Button variant='primary' onClick={handleUpdateStatus} disabled={isLoading}>
          {isLoading ? 'Încărcare...' : 'Aprobare'}
        </Button>
      </ButtonWrapper>
    </Modal>
  )
}
