import { CSSProperties, Select, SelectProps } from '@mantine/core';
import { IconChevronDown } from '@tabler/icons-react';

type StyledSelectProps = SelectProps & {
  styleOverrides?: CSSProperties;
};

const selectStyles = {
  input: {
    textAlign: 'left',
    paddingLeft: '12px',
    color: '#4c6ef5',
    backgroundColor: 'rgba(76, 110, 245, .1)',
    borderColor: '#4c6ef5',
  } as CSSProperties,
  dropdown: {
    backgroundColor: 'rgba(76, 110, 245, .1)',
    borderColor: '#4c6ef5',
  },
};

export const StyledSelect = ({
  styleOverrides = {},
  ...selectProps
}: StyledSelectProps) => {
  return (
    <Select
      {...selectProps}
      style={styleOverrides}
      styles={selectStyles}
      rightSection={<IconChevronDown size={14} />}
    />
  );
};
