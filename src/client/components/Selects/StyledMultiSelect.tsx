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
      color: '#4c6ef5',
      backgroundColor: 'rgb(23, 28, 41)',
      borderColor: '#4c6ef5',
      minHeight: '53.5px',
      opacity: 1,
      pointerEvents: disabled ? 'none' : 'pointer',
    } as CSSProperties,
    dropdown: {
      backgroundColor: 'rgb(23, 28, 41)',
      borderColor: '#4c6ef5',
    },
    pill: {
      paddingLeft: '8px',
      backgroundColor: '#4c6ef5',
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
