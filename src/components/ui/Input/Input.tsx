import React, { InputHTMLAttributes } from "react";
import { Text } from "../Text/Text";
import { Container, StyledInput } from "./Input.styled";
import { WDS_COLOR_BLACK } from "common/style/colors";

export interface LabeledInputProps
  extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  valid?: boolean;
}

export const Input = React.forwardRef<HTMLInputElement, LabeledInputProps>(
  (props, ref) => {
    const {
      valid = true,
      label = "",
      type = "text",
      disabled = false,
      placeholder,
      ...rest
    } = props;

    return (
      <Container style={{ width: "100%" }}>
        {label && (
          <Text variant='bodyS' color={WDS_COLOR_BLACK}>
            {label}
          </Text>
        )}
        <StyledInput
          ref={ref}
          type={type}
          placeholder={placeholder}
          disabled={disabled}
          valid={valid}
          {...rest}
        />
      </Container>
    );
  }
);
