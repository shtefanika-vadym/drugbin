import { ConfigProvider, DatePicker as DataPickerAntd } from 'antd'

export const DataPicker = () => {
  return (
    <ConfigProvider>
      <DataPickerAntd />
    </ConfigProvider>
  )
}
