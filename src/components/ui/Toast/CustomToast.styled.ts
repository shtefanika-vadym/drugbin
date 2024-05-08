import { flex } from "common/style/mixins/flex.mixin";
import { BREAKPOINTS, WDS_SIZE_008_PX, WDS_SIZE_016_PX, WDS_SIZE_028_PX, WDS_SIZE_350_PX } from "common/style/size";
import { ToastContainer } from "react-toastify";

import styled from "styled-components";

export const Container = styled.div`
  ${flex({ gap: WDS_SIZE_016_PX, alignItems: "center" })};
`;

export const Icon = styled.div<{ color: string }>`
  background-color: ${({ color }) => color};
  border-radius: ${WDS_SIZE_008_PX};
  height: 42px;
  width: 42px;
  ${flex({ alignItems: "center", justifyContent: "center" })}
`;

export const StyledContainer = styled(ToastContainer)`
  &&&.Toastify__toast-container {
    @media ${BREAKPOINTS.MOBILE_UP_TO} {
      position: fixed;
      top: ${WDS_SIZE_028_PX};
      left: 50%; /* Adjust as needed */
      transform: translateX(-50%);
      width: ${WDS_SIZE_350_PX};
    }
  }
`;
