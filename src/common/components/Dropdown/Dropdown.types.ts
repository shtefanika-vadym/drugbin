export interface DropdownProps {
  label?: string
  placeholder: string
  selectedOptions?: string
  options?: Array<string>
  callbackOnChange?: (selectedOption: string) => void
}
