import { useMemo, useState } from 'react'

import { RecycleHeader } from 'layout/Header/RecycleHeader'
import { useAppDispatch, useAppSelector } from 'store/hooks'

import { Button } from 'common/components/Button/Button'
import { FinishModal } from 'common/components/Modal/FinishModal/FinishModal'
import { QRModal } from 'common/components/Modal/QRModal/QRModal'
import { SET_SHOW_MODAL } from 'common/state/modalSlice'

import { DrugInformation } from 'features/Recycle/components/DrugInformation/DrugInformation'
import { LocationInformation } from 'features/Recycle/components/LocationInformation/LocationInformation'
import { PersonalInfromation } from 'features/Recycle/components/PersonalInfromation/PersonalInfromation'
import { Stepper } from 'features/Recycle/components/Stepper/Stepper'
import { STEP_1, STEP_2, STEP_3 } from 'features/Recycle/constatnts/constants'
import { SET_OPEN_VERBAL_PROCESS } from 'features/Recycle/slices/recycleSlice'

import { ButtonWrapper, RecycleWrapper } from './Recycle.styled'

export const Recycle = () => {
  const [activeStep, setActiveStep] = useState(1)
  const { isVerbalProcessOpen } = useAppSelector((state) => state.recycleReducer)

  const dispatch = useAppDispatch()

  const recycleSteps = useMemo(() => {
    switch (activeStep) {
      case 1:
        return (
          <Stepper title={STEP_1.TITLE} description={STEP_1.DESCRIPTION} tag={STEP_1.TAG}>
            <PersonalInfromation />
          </Stepper>
        )
      case 2:
        return (
          <Stepper title={STEP_2.TITLE} tag={STEP_2.TAG}>
            <DrugInformation />
          </Stepper>
        )
      case 3:
        return (
          <Stepper title={STEP_3.TITLE} tag={STEP_3.TAG}>
            <LocationInformation />
          </Stepper>
        )
      default:
        return '0'
    }
  }, [activeStep])

  const handleCloseModal = () => {
    dispatch(SET_SHOW_MODAL({ isOpenModal: false, childModal: null }))
  }

  const callbackOnClickFinish = () => {
    dispatch(
      SET_SHOW_MODAL({
        isOpenModal: true,
        childModal: <FinishModal handleCloseModal={handleCloseModal} />,
      }),
    )
  }

  const callbackOnClickAgree = () => {
    dispatch(SET_OPEN_VERBAL_PROCESS(false))
    dispatch(
      SET_SHOW_MODAL({
        isOpenModal: true,
        childModal: <QRModal handleCloseModal={handleCloseModal} />,
      }),
    )
  }

  const handleNext = () => {
    if (isVerbalProcessOpen && activeStep === 3) {
      callbackOnClickAgree()
    } else if (!isVerbalProcessOpen && activeStep === 3) {
      return callbackOnClickFinish()
    } else {
      setActiveStep((prevActiveStep) => prevActiveStep + 1)
    }
  }

  const handleBack = () => {
    if (isVerbalProcessOpen && activeStep === 3) {
      dispatch(SET_OPEN_VERBAL_PROCESS(false))
    } else {
      setActiveStep((prevActiveStep) => prevActiveStep - 1)
    }
  }

  return (
    <RecycleHeader>
      <RecycleWrapper>
        <div>{recycleSteps}</div>
        <ButtonWrapper>
          {activeStep !== 1 && (
            <Button
              size='None'
              variant={isVerbalProcessOpen ? 'secondary' : 'empty'}
              onClick={handleBack}>
              {isVerbalProcessOpen ? 'No, cancel' : 'Go back'}
            </Button>
          )}
          <Button type='submit' onClick={handleNext}>
            {activeStep === 3 ? 'Select and finish' : 'Continue'}
          </Button>
        </ButtonWrapper>
      </RecycleWrapper>
    </RecycleHeader>
  )
}
