import React, { ReactNode } from 'react';

import { StyledIconButton } from 'components/TableActionButton/styles';

type Props = {
  title: string;
  icon: ReactNode;
  onClick?: () => void;
  disabled?: boolean;
}

const TableActionButton = ({title, icon, onClick, disabled}: Props) => (
    <StyledIconButton title={title} onClick={onClick} disabled={disabled}>
      {icon}
    </StyledIconButton>
)

export default TableActionButton;