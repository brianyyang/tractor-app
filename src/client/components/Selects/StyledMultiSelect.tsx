import { CSSProperties, MultiSelect, MultiSelectProps } from '@mantine/core';
import { IconChevronDown } from '@tabler/icons-react';
import styles from './Select.module.css';

type StyledMultiSelectProps = MultiSelectProps & {
  styleOverrides?: CSSProperties;
  disabled?: boolean;
};

export const StyledMultiSelect = ({
  styleOverrides = {},
  disabled = false,
  ...multiSelectProps
}: StyledMultiSelectProps) => {
  const multiSelectStyles = {
    input: {
      display: 'flex',
      alignItems: 'center',
      paddingLeft: '12px',
      color: 'var(--foreground)',
      backgroundColor: 'var(--background-secondary)',
      borderColor: 'var(--foreground)',
      minHeight: '53.5px',
      opacity: 1,
      pointerEvents: disabled ? 'none' : 'pointer',
    } as CSSProperties,
    dropdown: {
      backgroundColor: 'var(--background-secondary)',
      borderColor: 'var(--foreground)',
    },
    pill: {
      paddingLeft: '8px',
      backgroundColor: 'var(--background)',
      paddingRight: disabled ? '8px' : '0px',
    },
    pillsList: {
      padding: '12px 0',
      width: '90%',
    },
  };

  return (
    <MultiSelect
      className={styles.select}
      classNames={{
        option: styles.option,
      }}
      style={styleOverrides}
      styles={multiSelectStyles}
      rightSection={disabled ? <div /> : <IconChevronDown size={16} />}
      disabled={disabled}
      {...multiSelectProps}
    />
  );
};
