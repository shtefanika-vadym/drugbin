import { WDS_COLOR_GREEN, WDS_COLOR_RED_100 } from "common/style/colors";
import { toast } from "react-toastify";
import { AlertIcon, SuccessIcon } from "../Icon";
import { Text } from "../Text/Text";
import { Container, Icon } from "./CustomToast.styled";

export enum ToastType {
  SUCCES = "succes",
  ERROR = "error",
}

interface ToastProps {
  message: string;
  type: ToastType;
}

export const CustomToast: React.FC<ToastProps> = ({
  message,
  type = ToastType.SUCCES,
}) => {
  const toastColor =
    type === ToastType.SUCCES ? WDS_COLOR_GREEN : WDS_COLOR_RED_100;
  const toastIcon = type === ToastType.SUCCES ? <SuccessIcon /> : <AlertIcon />;

  return (
    <Container>
      <div>
        <Icon color={toastColor}>{toastIcon}</Icon>
      </div>
      <Text variant='bodyXS'>{message}</Text>
    </Container>
  );
};

export const notify = (message: string, type: ToastType) =>
  toast(<CustomToast message={message} type={type} />);
