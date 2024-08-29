import { flex } from "common/styles/mixins/flex.mixin";
import { WDS_SIZE_016_PX } from "common/styles/size";
import styled from "styled-components";

export const ActionContainer = styled.div`
  ${flex({ gap: WDS_SIZE_016_PX })}
`