import { CustomTable } from 'common/components/CustomTable/CustomTable'
import { columns } from 'common/components/CustomTable/TableColumns'
import { tableData } from 'common/constants/mockData'

import styles from './homeOngoing.module.scss'

const HomeOngoing = () => {
  return (
    <div className={styles.parent}>
      <CustomTable columns={columns} dataSource={tableData} />
    </div>
  )
}

export default HomeOngoing
