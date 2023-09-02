import { useEffect, useRef } from 'react'
import { useDispatch } from 'react-redux'

import { useAppSelector } from 'store/hooks'

import { SET_SHOW_MODAL } from 'common/state/modalSlice'

import { SET_DRUGS_FROM_CAMERA, SET_DRUGS_SIZE } from 'features/Collect/slices/recycleSlice'
import { useDrugsIdentifyMutation } from 'api/recycleApi'
import { ProcessingModal } from 'components/ui/Modal/ProcessingModal/ProcessingModal'

export const Camera = () => {
  const dispatch = useDispatch()
  const { type } = useAppSelector((state) => state.recycleReducer)
  const inputFileRef = useRef(null)
  const [drugsIdentify, { isLoading }] = useDrugsIdentifyMutation()

  const formatDrugObject = (obj: any) => {
    console.log(obj)
    const formattedObject = {
      drugName: {
        drugId: obj.id,
        name: obj.name,
        value: obj.name,
      },
      pack: 'Pack',
      quantity: 1,
      expirationDate: obj?.expirationDate || null,
      lot: obj?.lot || null,
    }

    return formattedObject
  }

  const handleFileUpload = async (event: any) => {
    const image = event.target.files[0]
    const response = await drugsIdentify({ image })
    const { data } = response
    console.log(data)
    const formattedResponse = data.map((obj: any) => formatDrugObject(obj))
    // const formattedResponse = test
    console.log('response', formattedResponse)
    dispatch(SET_DRUGS_SIZE(formattedResponse.length))
    dispatch(SET_DRUGS_FROM_CAMERA(formattedResponse))
  }

  const handleCloseModal = () => {
    dispatch(SET_SHOW_MODAL({ isOpenModal: false, childModal: null }))
  }

  useEffect(() => {
    if (isLoading) {
      dispatch(
        SET_SHOW_MODAL({
          isOpenModal: true,
          childModal: <ProcessingModal handleCloseModal={handleCloseModal} isLoading={isLoading} />,
        }),
      )
    } else {
      dispatch(SET_SHOW_MODAL({ isOpenModal: false, childModal: null }))
    }
  }, [isLoading])

  useEffect(() => {
    if (type === 'automatic') inputFileRef.current.click()
  }, [type])

  return (
    <div>
      <input
        type='file'
        accept='image/*'
        capture={true}
        style={{ display: 'none' }}
        ref={inputFileRef}
        onChange={handleFileUpload}
      />
    </div>
  )
}

// const test: any = [
//   {
//     drugName: {
//       drugId: 4023,
//       name: 'BIOFEN EXTRA 400 mg/325 mg',
//       value: 'BIOFEN EXTRA 400 mg/325 mg',
//     },
//     pack: 'Pack',
//     quantity: 1,
//     expirationDate: null,
//     lot: '',
//   },
//   {
//     drugName: {
//       drugId: 21483,
//       name: 'PARASINUS',
//       value: 'PARASINUS',
//     },
//     pack: 'Pack',
//     quantity: 1,
//     expirationDate: null,
//     lot: '',
//   },
// ]
