import { CSSProperties, TextInput, TextInputProps } from '@mantine/core';
import { IconChevronDown } from '@tabler/icons-react';

type StyledTextInputProps = TextInputProps & {
  styleOverrides?: CSSProperties;
};

const textInputStyles = {
  input: {
    textAlign: 'left',
    paddingLeft: '12px',
    color: '#4c6ef5',
    backgroundColor: 'rgb(23, 28, 41)',
    borderColor: '#4c6ef5',
  } as CSSProperties,
  dropdown: {
    backgroundColor: 'rgb(23, 28, 41)',
    borderColor: '#4c6ef5',
  },
};

export const StyledTextInput = ({
  styleOverrides = {},
  ...textInputProps
}: StyledTextInputProps) => {
  return (
    <TextInput
      style={styleOverrides}
      styles={textInputStyles}
      {...textInputProps}
    />
  );
};
