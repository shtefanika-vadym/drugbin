import { useHospitalProfile } from 'common/hooks/hospital'
import { WDS_COLOR_BLUE_400, WDS_COLOR_GREY } from 'common/styles/colors'
import { StatusTag } from 'components/admin/StatusTag'
import { fmtDate } from 'components/admin/format'
import { Text } from 'components/ui/Text/Text'
import { ChangePasswordForm } from './ChangePasswordForm'
import { SignatureCard } from './SignatureCard'
import {
  Card,
  CardHeader,
  Divider,
  Field,
  FieldList,
  Hint,
  IdentityName,
  IdentityRail,
  IdentityTop,
  Monogram,
  PageHead,
  ProfileGrid,
  RightColumn,
  Sections,
} from './profile.styled'

const monogram = (name: string): string =>
  name
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((w) => w[0])
    .join('')

export const HospitalProfile = () => {
  const { profile, isLoading, isError, mutate } = useHospitalProfile()

  if (isLoading || !profile) {
    return (
      <Text variant='bodyM' color={WDS_COLOR_GREY}>
        {isError ? 'Profilul nu a putut fi încărcat.' : 'Se încarcă…'}
      </Text>
    )
  }

  return (
    <Sections>
      <PageHead>
        <Text variant='titleH4'>Profilul spitalului</Text>
        <Text variant='bodyS' color={WDS_COLOR_GREY}>
          Datele contului, parola și semnătura pentru procesele verbale.
        </Text>
      </PageHead>

      <ProfileGrid>
        <IdentityRail>
          <IdentityTop>
            <Monogram aria-hidden>{monogram(profile.name)}</Monogram>
            <IdentityName>
              <Text variant='subheading'>{profile.name}</Text>
              <Text variant='bodyS' color={WDS_COLOR_GREY}>
                {profile.city || 'Oraș nespecificat'}
              </Text>
            </IdentityName>
          </IdentityTop>

          {profile.status === 'active' ? (
            <StatusTag tone='ok'>Activ</StatusTag>
          ) : (
            <StatusTag tone='danger'>Suspendat</StatusTag>
          )}

          <Divider />

          <FieldList>
            <Field>
              <dt>Adresă</dt>
              <dd>{profile.address || '—'}</dd>
            </Field>
            <Field>
              <dt>Email</dt>
              <dd>{profile.loginEmail}</dd>
            </Field>
            <Field>
              <dt>Cont creat</dt>
              <dd>{fmtDate(profile.createdAt)}</dd>
            </Field>
          </FieldList>

          <Divider />

          <Hint>
            Aceste date sunt gestionate de administrator. Pentru modificări, contactează-l.
          </Hint>
        </IdentityRail>

        <RightColumn>
          <Card>
            <CardHeader>
              <Text variant='subheading' color={WDS_COLOR_BLUE_400}>
                Parolă
              </Text>
              <Text variant='bodyXS' color={WDS_COLOR_GREY}>
                Parola inițială a fost emisă de administrator. O poți schimba oricând cu una aleasă
                de tine.
              </Text>
            </CardHeader>
            <ChangePasswordForm />
          </Card>

          <Card>
            <CardHeader>
              <Text variant='subheading' color={WDS_COLOR_BLUE_400}>
                Semnătură pentru procese verbale
              </Text>
              <Text variant='bodyXS' color={WDS_COLOR_GREY}>
                Se adaugă automat în procesul verbal, la „Am predat”. Fără ea, PV-ul are un câmp gol
                pe care îl semnezi de mână.
              </Text>
            </CardHeader>
            <SignatureCard signature={profile.signature} onChange={() => mutate()} />
          </Card>
        </RightColumn>
      </ProfileGrid>
    </Sections>
  )
}
