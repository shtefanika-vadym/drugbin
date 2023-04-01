import {
  WDS_SIZE_012_PX,
  WDS_SIZE_014_PX,
  WDS_SIZE_016_PX,
  WDS_SIZE_018_PX,
  WDS_SIZE_020_PX,
  WDS_SIZE_024_PX,
  WDS_SIZE_032_PX,
} from 'common/style/size'
import {
  WDS_TEXT_FAMILY_BASE,
  WDS_TEXT_WEIGHT_BOLD,
  WDS_TEXT_WEIGHT_DEMI,
  WDS_TEXT_WEIGHT_REGULAR,
} from 'common/style/typography'

export interface Dictionary<T> {
  [Key: string]: T
}

export const TEXT_VARIANT_NAMES = [
  'bodyXS',
  'bodyS',
  'bodyM',
  'titleH5',
  'titleH4',
  'subheading',
] as const

export type TextVariantName = typeof TEXT_VARIANT_NAMES[number]
export type TextVariantType = TextVariantName

export interface TextVariant {
  family: string
  weight: number | string
  textTransform: 'none' | 'uppercase'
  style: 'normal' | 'italic'
  size: number | string
  lineHeight: number | string
  letterSpacing: 'normal' | string
}

export const TEXT_VARIANTS: Dictionary<TextVariant> = {
  bodyXS: {
    family: WDS_TEXT_FAMILY_BASE,
    weight: WDS_TEXT_WEIGHT_DEMI,
    style: 'normal',
    size: WDS_SIZE_012_PX,
    lineHeight: WDS_SIZE_018_PX,
    textTransform: 'none',
    letterSpacing: 'normal',
  },
  bodyS: {
    family: WDS_TEXT_FAMILY_BASE,
    weight: WDS_TEXT_WEIGHT_REGULAR,
    style: 'normal',
    size: WDS_SIZE_014_PX,
    lineHeight: WDS_SIZE_018_PX,
    textTransform: 'none',
    letterSpacing: 'normal',
  },
  bodyM: {
    family: WDS_TEXT_FAMILY_BASE,
    weight: WDS_TEXT_WEIGHT_REGULAR,
    style: 'normal',
    size: WDS_SIZE_016_PX,
    lineHeight: WDS_SIZE_024_PX,
    textTransform: 'none',
    letterSpacing: 'normal',
  },

  titleH5: {
    family: WDS_TEXT_FAMILY_BASE,
    weight: WDS_TEXT_WEIGHT_BOLD,
    style: 'normal',
    size: WDS_SIZE_024_PX,
    lineHeight: WDS_SIZE_032_PX,
    textTransform: 'none',
    letterSpacing: 'normal',
  },

  titleH4: {
    family: WDS_TEXT_FAMILY_BASE,
    weight: WDS_TEXT_WEIGHT_BOLD,
    style: 'normal',
    size: WDS_SIZE_024_PX,
    lineHeight: WDS_SIZE_032_PX,
    textTransform: 'none',
    letterSpacing: 'normal',
  },

  subheading: {
    family: WDS_TEXT_FAMILY_BASE,
    weight: WDS_TEXT_WEIGHT_DEMI,
    style: 'normal',
    size: WDS_SIZE_016_PX,
    lineHeight: WDS_SIZE_020_PX,
    textTransform: 'none',
    letterSpacing: 'normal',
  },
}

export const textVariant = (variantName: TextVariantType) => {
  const variant = TEXT_VARIANTS[variantName]

  return variant
    ? `
      font-family: ${variant.family};
      font-style: ${variant.style};
      font-weight: ${variant.weight};
      font-size: ${variant.size};
      line-height: ${variant.lineHeight};
      text-transform: ${variant.textTransform};
      letter-spacing: ${variant.letterSpacing};
      `
    : `
      /* DEBUG */
      /*font-size:18px;*/
      /*color:red!important;*/
      `
}
