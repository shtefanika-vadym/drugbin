export interface DropdownProps {
  name?: string
  label?: string
  placeholder: string
  selectedOptions?: string
  options?: Array<string>
  callbackOnChange?: (selectedOption: string) => void
}
