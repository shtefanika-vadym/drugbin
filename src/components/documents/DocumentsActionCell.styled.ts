import { flex } from "common/style/mixins/flex.mixin";
import { WDS_SIZE_016_PX } from "common/style/size";
import styled from "styled-components";

export const Container = styled.div`
  ${flex({ gap: WDS_SIZE_016_PX })}
`