import { Box, TableCell } from '@mui/material';
import React, { ReactNode } from 'react';

import { actionsWrapperStyles } from 'components/TableActionsCell/styles';

type Props = {
  children: ReactNode;
}

const TableActionsCell = ({children}: Props) => (
    <TableCell padding="none">
      <Box sx={actionsWrapperStyles}>
        {children}
      </Box>
    </TableCell>
)

export default TableActionsCell;