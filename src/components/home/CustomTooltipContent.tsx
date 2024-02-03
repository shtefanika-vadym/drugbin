interface CustomTooltipContentProps {
  value: string
}

export const CustomTooltipContent: React.FC<CustomTooltipContentProps> = ({ value }) => {
  return <div>{value}</div>
}
