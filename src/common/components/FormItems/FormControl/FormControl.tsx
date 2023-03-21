import type { FC } from 'react'

import { FormCheckbox } from 'common/components/FormItems/FormCheckbox/FormCheckbox'
import { FormInput } from 'common/components/FormItems/FormInput/FormInput'
import { FormRadio } from 'common/components/FormItems/FormRadio/FormRadio'
import { FormSelect } from 'common/components/FormItems/FormSelect/FormSelect'
import { FormSwitch } from 'common/components/FormItems/FormSwitch/FormSwitch'
import { FormTextarea } from 'common/components/FormItems/FormTextarea/FormTextarea'
import { FORM_CONTROL_TYPE } from 'common/constants/formControlConstants'
import { INPUT_PLACEHOLDER } from 'common/constants/inputConstants'
import type { IFormControl } from 'common/interfaces/IFormItem'

export const FormControl: FC<IFormControl> = ({
  name,
  control,
  style,
  options,
  label,
  type,
  onChange,
  ...rest
}) => {
  switch (control) {
    case FORM_CONTROL_TYPE.CHECKBOX:
      return <FormCheckbox name={name} label={label} />

    case FORM_CONTROL_TYPE.SWITCH:
      return <FormSwitch name={name} label={label} />

    case FORM_CONTROL_TYPE.SELECT:
      return (
        <FormSelect
          {...rest}
          name={name}
          label={label}
          listOptions={options}
          placeholder={INPUT_PLACEHOLDER.TYPE_HERE}
        />
      )

    case FORM_CONTROL_TYPE.RADIO:
      return <FormRadio name={name} label={label} style={style} options={options as string[]} />

    case FORM_CONTROL_TYPE.INPUT:
      return (
        <FormInput
          {...rest}
          name={name}
          type={type}
          label={label}
          onChange={onChange}
          placeholder={INPUT_PLACEHOLDER.TYPE_HERE}
        />
      )

    case FORM_CONTROL_TYPE.TEXTAREA:
      return <FormTextarea name={name} label={label} />

    default:
      return null
  }
}
