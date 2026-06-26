import { CSSProperties, TextInput, TextInputProps } from '@mantine/core';
import styles from './TextInput.module.css';

type StyledTextInputProps = TextInputProps & {
  styleOverrides?: CSSProperties;
};

const textInputStyles = {
  input: {
    textAlign: 'left',
    paddingLeft: '12px',
    paddingRight: '12px',
    color: 'var(--foreground)',
    backgroundColor: 'var(--background-secondary)',
    borderColor: 'var(--foreground)',
  } as CSSProperties,
  dropdown: {
    backgroundColor: 'var(--background-secondary)',
    borderColor: 'var(--foreground)',
  },
};

export const StyledTextInput = ({
  styleOverrides = {},
  ...textInputProps
}: StyledTextInputProps) => {
  return (
    <TextInput
      classNames={{ label: styles.label }}
      style={styleOverrides}
      styles={textInputStyles}
      {...textInputProps}
    />
  );
};
