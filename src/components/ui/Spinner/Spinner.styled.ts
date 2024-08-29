import { WDS_COLOR_BLUE_400 } from 'common/styles/colors';
import styled, { css, keyframes } from 'styled-components';
import { SpinnerProps } from './Spinner';

const SPINNER_DEFAULT_SIZE = 24;
const RING_DEFAULT_SIZE = 2;

const rotate = keyframes`
    0% {
      transform: rotate(0deg);
    }
    100% { 
      transform: rotate(360deg);
    }
`;

export const StyledSpinner = styled.div<SpinnerProps>`
  display: inline-block;
  position: relative;
  animation: ${rotate} 1s infinite linear;
  ${({ size = SPINNER_DEFAULT_SIZE }) => css`
    width: ${size}px;
    height: ${size}px;
  `};
  &:before {
    content: '';
    box-sizing: border-box;
    display: block;
    position: absolute;
    width: 100%;
    height: 100%;
    border-style: solid;
    border-radius: 50%;
    ${({ color = WDS_COLOR_BLUE_400, ringWidth = RING_DEFAULT_SIZE }) => css`
      border-color: ${color} ${color} ${color} transparent;
      border-width: ${ringWidth}px;
    `};
  }
`;
