import { Tag } from 'components/ui/Tag/Tag'
import { TagVariantType } from 'components/ui/Tag/Tag.type'
import React from 'react'
import {
    BoxContainer,
    ContentVisibility,
    DeleteSignature,
    Name,
    Signature,
    SignatureAction,
    SignatureWrapper,
} from './SettingsSignature.styled'
import SignatureImage from './signature.png'

interface SignatureBoxProps {
  isDefault?: boolean
}

export const SignatureBox: React.FC<SignatureBoxProps> = ({ isDefault = false }) => {
  return (
    <BoxContainer isDefault={isDefault}>
      <SignatureWrapper>
        <ContentVisibility isDefault={!isDefault}>
          <Tag variant={TagVariantType.DEFAULT} />
        </ContentVisibility>
        <ContentVisibility isDefault={isDefault}>
          <DeleteSignature />
        </ContentVisibility>
      </SignatureWrapper>
      <Name>Spitalul Judetean Suceava</Name>
      <SignatureWrapper>
        <Signature src={SignatureImage} />
        <ContentVisibility isDefault={isDefault}>
          <SignatureAction>setează ca implicită</SignatureAction>
        </ContentVisibility>
      </SignatureWrapper>
    </BoxContainer>
  )
}
