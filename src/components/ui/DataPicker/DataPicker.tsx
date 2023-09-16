import { ConfigProvider, DatePicker as DataPickerAntd } from 'antd'
import 'antd/lib/date-picker/style/css'

export const DataPicker = () => {
  return (
    <ConfigProvider>
      <DataPickerAntd />
    </ConfigProvider>
  )
}
