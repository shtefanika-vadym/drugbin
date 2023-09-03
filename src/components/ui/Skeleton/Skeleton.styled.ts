import { WDS_SIZE_008_PX } from 'common/style/size'
import styled from 'styled-components'

export const SkeletonStyle = styled.div<{ width: string; height: string }>`
  background: #e1e1e1;
  border-radius: ${WDS_SIZE_008_PX};
  width: ${(props) => props.width};
  height: ${(props) => props.height};
  position: relative;
  overflow: hidden;

  ::before {
    content: '';
    display: block;
    position: absolute;
    left: -150px;
    top: 0;
    height: 100%;
    width: 150px;
    background: linear-gradient(to right, transparent 0%, #e8e8e8 50%, transparent 100%);
    animation: load 1s cubic-bezier(0.4, 0, 0.2, 1) infinite;
  }

  @keyframes load {
    from {
      left: -150px;
    }
    to {
      left: 50%;
    }
  }
`
