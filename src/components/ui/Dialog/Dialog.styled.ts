import { WDS_COLOR_WHITE } from 'common/styles/colors'
import { flex } from 'common/styles/mixins/flex.mixin'
import {
  BREAKPOINTS,
  WDS_SIZE_008_PX,
  WDS_SIZE_012_PX,
  WDS_SIZE_016_PX,
  WDS_SIZE_036_PX,
  WDS_SIZE_040_PX,
  WDS_SIZE_048_PX,
  WDS_SIZE_400_PX,
} from 'common/styles/size'
import { WDS_Z_INDEX_THROBBER } from 'common/styles/tokens/layers'
import styled from 'styled-components'
import { Button } from '../Button/Button'

export const DIALOG_MIN_WIDTH = '385px'
export const DIALOG_MAX_WIDTH = '385px'

//same value as for SidebarNavigation container to keep layout in place
const DIALOG_CONTAINER_MAX_WIDTH_FOR_TABLET = `${WDS_SIZE_400_PX}`
interface DialogContainerProps {
  zIndex?: number
}

export const DialogContainer = styled.dialog.attrs({
  open: true,
})<DialogContainerProps>`
  all: unset;
  background-color: rgba(23, 23, 23, 0.48);

  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100%;
  z-index: ${({ zIndex }) => zIndex || WDS_Z_INDEX_THROBBER};
  ${flex({ alignItems: 'center', justifyContent: 'center' })};
`

export const DialogContainerWithMaxWidth = styled(DialogContainer)`
  @media ${BREAKPOINTS.TABLET} {
    max-width: ${DIALOG_CONTAINER_MAX_WIDTH_FOR_TABLET};
  }
`

export const DialogContent = styled.div`
  position: relative;
  height: 100%;
  width: 100vw;
  border-radius: ${WDS_SIZE_008_PX};
  overflow: auto;
  padding: ${WDS_SIZE_036_PX};
  background-color: ${WDS_COLOR_WHITE};
  box-shadow: 0px 1px 2px rgba(17, 24, 28, 0.16), 0px 8px 40px rgba(17, 24, 28, 0.2);

  width: auto;
  min-width: ${DIALOG_MIN_WIDTH};
  max-width: ${DIALOG_MAX_WIDTH};
  height: fit-content;
  max-height: ${`calc(100vh - ${WDS_SIZE_048_PX})`};
`

export const DialogForm = styled.form`
  ${flex({ direction: 'column' })};
  padding: ${WDS_SIZE_036_PX} ${WDS_SIZE_040_PX};
`

export const ButtonWrapper = styled.div`
  position: absolute;
  top: ${WDS_SIZE_012_PX};
  right: ${WDS_SIZE_012_PX};
`

export const CloseButton = styled(Button)``

export const DocumentContainer = styled.div`
  ${flex({ direction: 'column', justifyContent: 'center' })};
  height: 90vh;
  width: 80vw;
`

export const TopDocumentHeader = styled.div`
  ${flex({ justifyContent: 'flex-end' })};
  background-color: ${WDS_COLOR_WHITE};
  padding: ${WDS_SIZE_016_PX};
  width: 100%;
  box-sizing: border-box;
`
