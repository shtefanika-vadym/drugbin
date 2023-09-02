import { useMemo, useState } from 'react'

import { DrugInformation } from 'features/Collect/components/DrugInformation/DrugInformation'
import { LocationInformation } from 'features/Collect/components/LocationInformation/LocationInformation'
import { PersonalInfromation } from 'features/Collect/components/PersonalInfromation/PersonalInfromation'
import { Stepper } from 'features/Collect/components/Stepper/Stepper'
import { STEP_1, STEP_2, STEP_3 } from 'features/Collect/constatnts/constants'

import { QrCode } from 'features/Collect/components/QrCode/QrCode'
import { VerbalProcess } from 'features/Collect/components/VerbalProcess/VerbalProcess'
import { transformData } from 'features/Collect/utils/utils'
import { useAppSelector } from 'store/hooks'
import { RecycleWrapper } from './Collect.styled'

export const Collect = () => {
  const [activeStep, setActiveStep] = useState<number>(1)
  const { collectData } = useAppSelector((state) => state.recycleReducer)
  const data = transformData(collectData)

  const recycleSteps = useMemo(() => {
    switch (activeStep) {
      case 1:
        return (
          <Stepper
            title={STEP_1.TITLE}
            description={STEP_1.DESCRIPTION}
            tag={STEP_1.TAG}
            activeStep={activeStep}>
            <PersonalInfromation setActiveStep={setActiveStep} />
          </Stepper>
        )
      case 2:
        return (
          <Stepper title={STEP_2.TITLE} tag={STEP_2.TAG} activeStep={activeStep}>
            <DrugInformation setActiveStep={setActiveStep} />
          </Stepper>
        )
      case 3:
        return (
          <Stepper title={STEP_3.TITLE} tag={STEP_3.TAG} activeStep={activeStep}>
            <LocationInformation setActiveStep={setActiveStep} />
          </Stepper>
        )
      case 4:
        return <VerbalProcess setActiveStep={setActiveStep} />
      case 5:
        return <QrCode drugs={data} />
      default:
        return '0'
    }
  }, [activeStep])

  return <RecycleWrapper>{recycleSteps}</RecycleWrapper>
}
