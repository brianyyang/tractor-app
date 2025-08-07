import { CSSProperties, MultiSelect, MultiSelectProps } from '@mantine/core';
import { IconChevronDown } from '@tabler/icons-react';

type StyledMultiSelectProps = MultiSelectProps & {
  styleOverrides?: CSSProperties;
};

const multiSelectStyles = {
  input: {
    display: 'flex',
    alignItems: 'center',
    paddingLeft: '12px',
    color: '#4c6ef5',
    backgroundColor: 'rgb(23, 28, 41)',
    borderColor: '#4c6ef5',
    minHeight: '53.5px',
  } as CSSProperties,
  dropdown: {
    backgroundColor: 'rgb(23, 28, 41)',
    borderColor: '#4c6ef5',
  },
  pill: {
    paddingLeft: '8px',
    backgroundColor: '#4c6ef5',
  },
  pillsList: {
    padding: '12px 0',
    width: '90%',
  },
  option: {
    paddingLeft: '12px',
    '&:active': {
      backgroundColor: '#54df76ff',
    },
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
      rightSection={<IconChevronDown size={16} />}
    />
  );
};
