import React, { FC, ReactNode, useContext } from 'react';
import { TableContext } from './TableContext';
import { StyledTableHeaderCell } from './TableHeaderCell.styled';

interface TableHeaderCellProps {
  cellName?: string;
  children?: ReactNode;
}

export const TableHeaderCell: FC<TableHeaderCellProps> = ({ children, cellName }) => {
  const config = useContext(TableContext);

  return (
    <StyledTableHeaderCell
      cellName={cellName}
      config={config}
      itemGridRows={config.itemGridRows}
      breakpoint={config.breakpoint}
    >
      {children}
    </StyledTableHeaderCell>
  );
};
