import React, { ReactNode } from 'react'
import { Spinner } from '../Spinner/Spinner'
import { Container, StyledLoaderContainer } from './Loader.styled'

export interface LoaderProps {
  className?: string
  children?: ReactNode
  isLoading: boolean
  size?: number
  justify?: 'flex-start' | 'center' | 'flex-end'
  spacing?: string
  color?: `#${string}`
  ringWidth?: number
  centered?: boolean
}

export const Loader: React.FC<LoaderProps> = ({
  className,
  children,
  isLoading,
  justify,
  spacing,
  centered,
  ...rest
}) => {
  return (
    <>
      {isLoading ? (
        <Container className={className} justify={justify} spacing={spacing} centered={centered}>
          <Spinner {...rest} />
        </Container>
      ) : (
        <StyledLoaderContainer>{children}</StyledLoaderContainer>
      )}
    </>
  )
}
