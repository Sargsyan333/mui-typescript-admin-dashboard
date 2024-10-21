import { ReactElement } from 'react';
import { Box } from '@mui/material';

import { tableContainerStyles } from 'components/TableWrapper/styles';

type Props = {
  children: ReactElement;
}

const TableWrapper = ({children}: Props) => (
    <Box sx={tableContainerStyles}>
      {children}
    </Box>
  )

export default TableWrapper;