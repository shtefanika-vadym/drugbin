import { HeaderWrapper } from 'layout/Header/HeaderWrapper'

import useUserRole from 'common/hooks/useGetUserRole'

import { HomeOngoing } from 'features/Home/components/HomeOngoing'
import { HomeRecycle } from 'features/Home/components/HomeRecycle/HomeRecycle'

const Home = () => {
  const { isPharmacy } = useUserRole()
  if (!isPharmacy) return <HomeRecycle />
  return (
    <HeaderWrapper>
      <HomeOngoing />
    </HeaderWrapper>
  )
}
export default Home
