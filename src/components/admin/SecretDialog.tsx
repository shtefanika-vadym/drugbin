import { WDS_COLOR_GREY, WDS_COLOR_RED } from 'common/styles/colors'
import { Button } from 'components/ui/Button/Button'
import { CopyText } from 'components/ui/CopyText/CopyText'
import { Text } from 'components/ui/Text/Text'
import { Actions, Description, Form, SecretBox } from './dialog.styled'

export interface Secret {
  title: string
  /** e.g. the login email that pairs with a password */
  context?: string
  label: string
  value: string
}

/** One-time reveal of a generated password / device key, for `useDialog`. Cannot be shown again. */
export const SecretDialog: React.FC<{ secret: Secret; close: () => void }> = ({
  secret,
  close,
}) => (
  <Form>
    <Text variant='titleH4'>{secret.title}</Text>
    {secret.context && <Description>{secret.context}</Description>}
    <SecretBox>
      <Text variant='bodyS' color={WDS_COLOR_GREY}>
        {secret.label}
      </Text>
      <CopyText value={secret.value}>
        <code>{secret.value}</code>
      </CopyText>
    </SecretBox>
    <Text variant='bodyXS' color={WDS_COLOR_RED}>
      Notează această valoare acum — nu va mai fi afișată.
    </Text>
    <Actions>
      <Button onClick={close}>Am notat</Button>
    </Actions>
  </Form>
)
