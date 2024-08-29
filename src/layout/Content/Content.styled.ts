import { WDS_COLOR_WHITE } from 'common/styles/colors'
import { WDS_SIZE_008_PX, WDS_SIZE_024_PX } from 'common/styles/size'
import styled from 'styled-components'

export const Container = styled.div`
  background-color: ${WDS_COLOR_WHITE};
  border-radius: ${WDS_SIZE_008_PX};
  padding: ${WDS_SIZE_024_PX};
  max-width: 1285px;
  width: 100%;
  box-sizing: border-box;
`
