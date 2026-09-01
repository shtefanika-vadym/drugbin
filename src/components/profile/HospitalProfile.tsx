import { useHospitalProfile } from 'common/hooks/hospital'
import { WDS_COLOR_GREY } from 'common/styles/colors'
import { DashboardCard } from 'components/layout/DashboardCard/DashboardCard'
import { StatusTag } from 'components/admin/StatusTag'
import { fmtDate } from 'components/admin/format'
import { Text } from 'components/ui/Text/Text'
import { ChangePasswordForm } from './ChangePasswordForm'
import { SignatureCard } from './SignatureCard'
import { Cards, DefinitionList, Hint, Sections } from './profile.styled'

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
      <Text variant='titleH4'>Profilul spitalului</Text>

      <Cards>
        <DashboardCard title='Detalii'>
          <DefinitionList>
            <dt>Nume</dt>
            <dd>{profile.name}</dd>
            <dt>Oraș</dt>
            <dd>{profile.city || '—'}</dd>
            <dt>Adresă</dt>
            <dd>{profile.address || '—'}</dd>
            <dt>Email autentificare</dt>
            <dd>{profile.loginEmail}</dd>
            <dt>Email de contact</dt>
            <dd>{profile.contactEmail || '—'}</dd>
            <dt>Status</dt>
            <dd>
              {profile.status === 'active' ? (
                <StatusTag tone='ok'>Activ</StatusTag>
              ) : (
                <StatusTag tone='danger'>Suspendat</StatusTag>
              )}
            </dd>
            <dt>Cont creat</dt>
            <dd>{fmtDate(profile.createdAt)}</dd>
          </DefinitionList>
          <Hint>
            Aceste date sunt gestionate de administrator. Pentru modificări, contactează-l.
          </Hint>
        </DashboardCard>

        <DashboardCard title='Parolă'>
          <ChangePasswordForm />
        </DashboardCard>

        <DashboardCard title='Semnătură pentru procese verbale'>
          <SignatureCard signature={profile.signature} onChange={() => mutate()} />
        </DashboardCard>
      </Cards>
    </Sections>
  )
}
