import { useRef } from 'react'

import { useDrugsIdentifyMutation } from 'features/Recycle/store/api/recycleApi'

import paduden from './paduden-duo-200mg-500mg-10-comprimate-filmate-terapia-3421.png'

export const Camera = () => {
  const inputFileRef = useRef(null)
  //   const { data } = useDrugsIdentifyQuerry({ image: 'your-image-url' })
  //   const { data, isLoading, isError } = useDrugsIdentifyQuery()
  const [drugsIdentify] = useDrugsIdentifyMutation()
  //   console.log(data, isLoading, isError)

  const handleFileUpload = async (event: any) => {
    const file = event.target.files[0]
    const formData = new FormData()
    console.log('formData', formData)
    // formData.append('photo', file)
    await drugsIdentify(file)
  }

  const openCamera = () => {
    inputFileRef.current.click()
  }
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
      <button onClick={openCamera}>Open Camera</button>
    </div>
  )
}
