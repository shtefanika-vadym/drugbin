export interface Ellipsis {
  maxWidth?: string;
  width?: string;
  display?: '-webkit-box';
  webkitBoxOrient?: 'vertical' | 'horizontal';
  webkitLineClamp?: number;
  whiteSpace?: 'pre-wrap' | 'nowrap';
}

export const ellipsis = ({
  maxWidth,
  width,
  display,
  webkitBoxOrient,
  webkitLineClamp,
  whiteSpace,
}: Ellipsis): string => `
    overflow: hidden;
    text-overflow: ellipsis;
    ${maxWidth ? `max-width: ${maxWidth};` : ''}
    ${width ? `width: ${width};` : '100%'}
    ${display ? `display: ${display};` : ''}
    ${webkitBoxOrient ? ` -webkit-box-orient: ${webkitBoxOrient};` : ''}
    ${webkitLineClamp ? ` -webkit-line-clamp: ${webkitLineClamp};` : ''}
    ${whiteSpace ? `white-space: ${whiteSpace};` : ''}
`;
