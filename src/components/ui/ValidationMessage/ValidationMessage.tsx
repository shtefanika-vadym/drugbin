import React from "react";
import { Container } from "./ValidationMessage.styled";

export interface ValidationMessageProps {
  children?: string;
}
export const ValidationMessage: React.FC<ValidationMessageProps> = ({
  children,
}) => {
  return (
    <Container>
      {/* <AlertIcon width={12} height={12} /> */}
      {children}
    </Container>
  );
};
