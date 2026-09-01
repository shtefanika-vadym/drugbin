import { StepTiming } from 'common/types/manage.types'
import { WDS_COLOR_GREY } from 'common/styles/colors'
import { Text } from 'components/ui/Text/Text'
import { Bar, Legend, Segment, Swatch, Total } from './TimingBreakdown.styled'
import { fmtMs } from './format'

export const TimingBreakdown: React.FC<{ steps: StepTiming[]; total?: number | null }> = ({
  steps,
  total,
}) => {
  if (steps.length === 0)
    return (
      <Text variant='bodyS' color={WDS_COLOR_GREY}>
        Fără date de timp.
      </Text>
    )
  const sum = steps.reduce((a, s) => a + s.ms, 0) || 1

  return (
    <div>
      <Bar>
        {steps.map((s, i) => (
          <Segment
            key={s.label}
            ratio={s.ms / sum}
            index={i}
            title={`${s.label}: ${fmtMs(s.ms)}`}
          />
        ))}
      </Bar>
      <Legend>
        {steps.map((s, i) => (
          <span key={s.label}>
            <Swatch index={i} />
            <Text variant='bodyXS' color={WDS_COLOR_GREY}>
              {s.label} · {fmtMs(s.ms)}
            </Text>
          </span>
        ))}
      </Legend>
      {total != null && (
        <Total>
          <Text variant='bodyXS' color={WDS_COLOR_GREY}>
            Total: {fmtMs(total)}
          </Text>
        </Total>
      )}
    </div>
  )
}
