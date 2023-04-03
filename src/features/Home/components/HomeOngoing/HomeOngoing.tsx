import { Input } from 'common/components/Input/Input'

import styles from './homeOngoing.module.scss'

const HomeOngoing = () => {
  return (
    <div className={styles.parent}>
      Hello Drugbin Solution
      <Input label='Input Label' placeholder='Placeholder' />
      <Input label='Input Label' placeholder='Placeholder' type='password' />
      <Input label='Number' placeholder='Number' type='number' />
    </div>
  )
}

export default HomeOngoing
