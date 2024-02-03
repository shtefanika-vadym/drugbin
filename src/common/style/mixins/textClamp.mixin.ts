export const textClamp = (lineCount: number = 0, ellipsis: boolean = true): string => `
  display: -webkit-box;
  -webkit-box-orient: vertical;
  overflow: hidden;
  text-overflow: ${ellipsis ? 'ellipsis' : 'clip'};
  -webkit-line-clamp: ${lineCount};
`
