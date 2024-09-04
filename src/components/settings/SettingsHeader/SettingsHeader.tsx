import { Description, Title } from "./SeatingsHeader.styled"

interface SettingsHeaderProps {
  title: string
  description: string
}

export const SettingsHeader: React.FC<SettingsHeaderProps> = ({title, description}) => {
  return (
    <>
      <Title>{title}</Title>
      <Description>{description}</Description>
    </>
  )
}
