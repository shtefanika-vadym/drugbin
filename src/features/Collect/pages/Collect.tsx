import { useMemo, useState } from 'react'

import { RecycleHeader } from 'layout/Header/RecycleHeader'
import { useAppDispatch, useAppSelector } from 'store/hooks'

import { Button } from 'common/components/Button/Button'
import { FinishModal } from 'common/components/Modal/FinishModal/FinishModal'
import { QRModal } from 'common/components/Modal/QRModal/QRModal'
import { SET_SHOW_MODAL } from 'common/state/modalSlice'

import { DrugInformation } from 'features/Collect/components/DrugInformation/DrugInformation'
import { LocationInformation } from 'features/Collect/components/LocationInformation/LocationInformation'
import { PersonalInfromation } from 'features/Collect/components/PersonalInfromation/PersonalInfromation'
import { Stepper } from 'features/Collect/components/Stepper/Stepper'
import { STEP_1, STEP_2, STEP_3 } from 'features/Collect/constatnts/constants'
import { SET_OPEN_VERBAL_PROCESS } from 'features/Collect/slices/recycleSlice'
import { transformData } from 'features/Collect/utils/utils'

import { ButtonWrapper, RecycleWrapper } from './Collect.styled'

export const Collect = () => {
  const [activeStep, setActiveStep] = useState(1)
  const { isVerbalProcessOpen, collectData, drugsSize } = useAppSelector(
    (state) => state.recycleReducer,
  )

  const dispatch = useAppDispatch()

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

  const callbackOnClickAgree = async () => {
    dispatch(SET_OPEN_VERBAL_PROCESS(false))
    const data = transformData(collectData)
    dispatch(
      SET_SHOW_MODAL({
        isOpenModal: true,
        childModal: <QRModal handleCloseModal={handleCloseModal} drugs={data} />,
      }),
    )
  }

  const recycleSteps = useMemo(() => {
    switch (activeStep) {
      case 1:
        return (
          <Stepper
            title={STEP_1.TITLE}
            description={STEP_1.DESCRIPTION}
            tag={STEP_1.TAG}
            activeStep={activeStep}>
            <PersonalInfromation />
          </Stepper>
        )
      case 2:
        return (
          <Stepper title={STEP_2.TITLE} tag={STEP_2.TAG} activeStep={activeStep}>
            <DrugInformation />
          </Stepper>
        )
      case 3:
        return (
          <Stepper title={STEP_3.TITLE} tag={STEP_3.TAG} activeStep={activeStep}>
            <LocationInformation />
          </Stepper>
        )
      default:
        return '0'
    }
  }, [activeStep])

  const handleNext = () => {
    switch (activeStep) {
      case 1:
        if (collectData.firstName === '' || collectData.lastName === '') return null
        break
      case 2:
        if (
          collectData.drugList[drugsSize - 1].drugName.name === '' ||
          collectData.drugList[drugsSize - 1].quantity <= 0
        )
          return null
        break
      case 3:
        if (isVerbalProcessOpen) return callbackOnClickAgree()
        if (!isVerbalProcessOpen) return callbackOnClickFinish()
    }
    setActiveStep((prevActiveStep) => prevActiveStep + 1)
  }

  const handleBack = () => {
    setActiveStep((prevActiveStep) => {
      if (prevActiveStep === 3 && isVerbalProcessOpen) {
        dispatch(SET_OPEN_VERBAL_PROCESS(false))
      }
      return prevActiveStep - 1
    })
  }

  return (
    <RecycleHeader>
      <RecycleWrapper>
        <>{recycleSteps}</>
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
