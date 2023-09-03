import { SkeletonStyle } from './Skeleton.styled'

interface SkeletonProps {
  width?: string
  height: string
}

export const Skeleton: React.FC<SkeletonProps> = ({ width = '100%', height }) => {
  return <SkeletonStyle height={height} width={width} />
}
