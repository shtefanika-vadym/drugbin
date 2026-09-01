/** Mirrors the drugbin-cf admin-console response shapes (src/schema/{hospital,machine,manage}.ts). */

export interface Hospital {
  id: string
  name: string
  slug: string
  city: string | null
  address: string | null
  contactEmail: string | null
  loginEmail: string
  status: 'active' | 'suspended'
  createdAt: number
  updatedAt: number
  credentialsRotatedAt: number | null
  machineCount: number
}

export interface Page {
  page: number
  pageSize: number
  total: number
}

export interface HospitalList extends Page {
  items: Hospital[]
}

export interface CredentialsResponse {
  hospital: Hospital
  loginEmail: string
  password: string
}

export interface Machine {
  machineId: string
  label: string
  site: string | null
  hospitalId: string | null
  hospitalName: string | null
  enabled: boolean
  hasKey: boolean
  createdAt: number
  lastSeenAt: number | null
  keyRotatedAt: number | null
}

export interface MachineList extends Page {
  items: Machine[]
}

export interface MachineKeyResponse {
  machine: Machine
  key: string
}

export interface ClassificationRow {
  imageId: string
  createdAt: number
  machineId: string
  requestId: string
  hospitalId: string | null
  tier: number
  confidence: 'high' | 'low' | 'none'
  drugName: string | null
  drugPackage: string | null
  drugConcentration: string | null
  drugPrescription: string | null
  drugAtc: string | null
  drugCategory: number | null
  matchScore: number | null
  matchMargin: number | null
  matchedImageId: string | null
  embedModel: string | null
  visionModel: string | null
  promptVersion: string | null
  imagesVersion: string | null
  gatewayLogId: string | null
  latencyTotalMs: number | null
  latencyNormalizeMs: number | null
  latencyEmbedMs: number | null
  latencyQueryMs: number | null
  latencyVisionMs: number | null
  rawKey: string | null
  rawMissing: number
  indexedAt: number | null
}

export interface StepTiming {
  label: string
  ms: number
}

export interface CorrectionRow {
  id: number
  imageId: string
  createdAt: number
  correctedBy: 'operator' | 'pharmacist' | 'import'
  reviewerId: string | null
  originalCategory: number | null
  correctedName: string | null
  correctedPackage: string | null
  correctedConcentration: string | null
  correctedPrescription: string | null
  correctedAtc: string | null
  correctedCategory: number
  note: string | null
}

export interface ClassificationList extends Page {
  items: ClassificationRow[]
}

export interface ClassificationDetail {
  classification: ClassificationRow
  corrections: CorrectionRow[]
  steps: StepTiming[]
  images: { norm: boolean; raw: boolean }
}

export interface DrugRecord {
  name: string
  package: string
  prescription: string
  category: number
  concentration?: string
  atc?: string
}

export interface SimulateResult {
  success: true
  data: { drug: DrugRecord }
  meta?: {
    image_id: string
    tier: number
    confidence?: string
    model_version?: string
    latency_ms: number
  }
}

export interface ReclassifyResponse {
  success: true
  original: { tier: number; confidence: string; drug: Record<string, unknown> }
  rerun: {
    tier1: { hit: boolean; drug?: Record<string, unknown>; score?: number; margin?: number }
    tier2: { confidence: string; model: string; drug: Record<string, unknown> }
    steps: StepTiming[]
  }
}

export const DRUG_CATEGORY_LABELS: Record<number, string> = {
  1: 'Citotoxic',
  2: 'Inhalator',
  3: 'Injectabil',
  4: 'Insulină',
  5: 'Uzual',
  6: 'Supliment',
  7: 'Psiholeptic',
}

export const PACKAGE_LABELS: Record<string, string> = {
  syringe: 'Seringă',
  injectable: 'Injectabil',
  box: 'Cutie',
  entity: 'Entitate',
}
