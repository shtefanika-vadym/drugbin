import { RO_CITIES } from 'common/constants/cities.ro'
import { Select } from 'components/ui/Select/Select'

/** "Oraș" — a dropdown of every oraș / municipiu din România. Keeps an out-of-list current value. */
export const CityField: React.FC<{ value: string; onChange: (v: string) => void }> = ({ value, onChange }) => {
  const extra = value && !RO_CITIES.includes(value) ? [value] : []
  return (
    <Select label='Oraș' value={value} onChange={(e) => onChange(e.target.value)}>
      <option value=''>— alege orașul —</option>
      {[...extra, ...RO_CITIES].map((c) => (
        <option key={c} value={c}>
          {c}
        </option>
      ))}
    </Select>
  )
}
