import { WDS_COLOR_WHITE } from 'common/style/colors'
import { WDS_SIZE_008_PX, WDS_SIZE_024_PX } from 'common/style/size'
import styled from 'styled-components'

export const Container = styled.div`
  background-color: ${WDS_COLOR_WHITE};
  border-radius: ${WDS_SIZE_008_PX};
  padding: ${WDS_SIZE_024_PX};
  box-sizing: border-box;
  max-width: 1285px;
  width: 100%;
`
