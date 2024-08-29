import { DatePicker as DatePickerLibrary, DatePickerProps } from 'react-date-picker'

import 'react-calendar/dist/Calendar.css'
import 'react-date-picker/dist/DatePicker.css'
import './datePicker.css'

export const DatePicker = ({ ...props }: DatePickerProps) => {
  return <DatePickerLibrary {...props} />
}
