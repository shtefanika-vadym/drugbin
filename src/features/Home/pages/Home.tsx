import { HomeOngoing } from 'features/Home/components/HomeOngoing'

import styles from './home.module.scss'

const Home = () => (
  <div className={styles.parent}>
    <HomeOngoing />
  </div>
)

export default Home
