import { CSSProperties, Select, SelectProps } from '@mantine/core';
import { IconChevronDown } from '@tabler/icons-react';
import styles from './Select.module.css';

type StyledSelectProps = SelectProps & {
  styleOverrides?: CSSProperties;
};

const selectStyles = {
  input: {
    textAlign: 'left',
    paddingLeft: '12px',
    color: 'var(--foreground)',
    backgroundColor: 'var(--background-secondary)',
    borderColor: 'var(--foreground)',
  } as CSSProperties,
  dropdown: {
    backgroundColor: 'var(--background-secondary)',
    borderColor: 'var(--foreground)',
  },
};

export const StyledSelect = ({
  styleOverrides = {},
  ...selectProps
}: StyledSelectProps) => {
  return (
    <Select
      className={styles.select}
      classNames={{ option: styles.option }}
      style={styleOverrides}
      styles={selectStyles}
      rightSection={<IconChevronDown size={16} />}
      {...selectProps}
    />
  );
};
