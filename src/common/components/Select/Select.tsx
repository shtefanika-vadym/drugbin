import type { FC } from 'react'
import { useId } from 'react'

import { Select as AntSelect, Skeleton } from 'antd'
import classNames from 'classnames'

import { SELECT_CONSTANTS } from 'common/constants/selectConstants'
import type { ISelect } from 'common/interfaces/ISelect'
import { UtilService } from 'common/services/utilService'

// I suppress next line with eslint-disable-next-line because i use dynamic class
// eslint-disable-next-line css-modules/no-unused-class
import styles from './select.module.scss'

import 'antd/lib/select/style/css'

const { Option } = AntSelect

export const Select: FC<ISelect> = ({
  label,
  isLoading,
  listOptions,
  placeholder,
  defaultValue,
  proportion = SELECT_CONSTANTS.MEDIUM,
  ...rest
}) => {
  const id = useId()
  return (
    <div className={styles.container}>
      {label && (
        <label htmlFor={id} className={styles.label}>
          {label}
        </label>
      )}
      <AntSelect
        {...rest}
        id={id}
        key={defaultValue}
        defaultValue={defaultValue}
        placeholder={
          isLoading ? (
            <Skeleton className={styles.parentSkeleton} paragraph={{ rows: 0 }} active />
          ) : (
            placeholder || 'None'
          )
        }
        optionFilterProp='children'
        className={classNames(
          styles.parent,
          styles[`parent${UtilService.capitalizeFirstLetter(proportion)}`],
        )}
        filterOption={(input, option) =>
          (option!.children as unknown as string).toLowerCase().includes(input.toLowerCase())
        }>
        {listOptions?.map((option: any, index: number) => {
          return (
            <Option key={index} value={option.code || option}>
              {option.name || option}
            </Option>
          )
        })}
      </AntSelect>
    </div>
  )
}