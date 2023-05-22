import { useRef } from 'react'

import { useDrugsIdentifyMutation } from 'features/Recycle/store/api/recycleApi'

export const Camera = () => {
  const inputFileRef = useRef(null)
  const [drugsIdentify] = useDrugsIdentifyMutation()

  const handleFileUpload = async (event: any) => {
    const image = event.target.files[0]
    await drugsIdentify({ image })
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
