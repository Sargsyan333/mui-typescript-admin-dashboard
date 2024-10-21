import { TableCell, TableHead, TableRow } from '@mui/material';
import React from 'react';

import { tableHeadCellStyles } from 'components/TableHeader/styles';
import { TableColumn } from 'types/generic';

type Props = {
  columns: TableColumn[];
}

const TableHeader = ({columns}: Props) => (
    <TableHead>
      <TableRow>
        {columns.map((column) => (
          <TableCell
            key={column.id}
            sx={tableHeadCellStyles(column.minWidth)}
          >
            {(column.label)}
          </TableCell>
        ))}
        <TableCell />
      </TableRow>
    </TableHead>
)

export default TableHeader;