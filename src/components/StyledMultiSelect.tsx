import { CSSProperties, MultiSelect, MultiSelectProps } from '@mantine/core';
import { IconChevronDown } from '@tabler/icons-react';

type StyledMultiSelectProps = MultiSelectProps & {
  styleOverrides?: CSSProperties;
};

const multiSelectStyles = {
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

export const StyledMultiSelect = ({
  styleOverrides = {},
  ...multiSelectProps
}: StyledMultiSelectProps) => {
  return (
    <MultiSelect
      {...multiSelectProps}
      style={styleOverrides}
      styles={multiSelectStyles}
      rightSection={<IconChevronDown size={14} />}
    />
  );
};
