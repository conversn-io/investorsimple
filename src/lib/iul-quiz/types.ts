export interface QuizState {
  step: number
  primaryGoal: string
  currentInvestments: string[]
  monthlySavings: string
  canFundMonthly: boolean | null
  age: number | null
  state: string
  firstName: string
  lastName: string
  email: string
  phone: string
  countryCode: string
  otpVerified: boolean
  disqualified: boolean
  tcpaConsented: boolean
}

export const INITIAL_STATE: QuizState = {
  step: 0,
  primaryGoal: '',
  currentInvestments: [],
  monthlySavings: '',
  canFundMonthly: null,
  age: null,
  state: '',
  firstName: '',
  lastName: '',
  email: '',
  phone: '',
  countryCode: '+1',
  otpVerified: false,
  disqualified: false,
  tcpaConsented: false,
}

export const STEP_NAMES: Record<number, string> = {
  1: 'goal',
  2: 'investments',
  3: 'savings',
  4: 'funding',
  5: 'age',
  6: 'state',
  7: 'name',
  8: 'email',
  9: 'phone',
  10: 'otp',
}

export const US_STATES = [
  'Alabama', 'Alaska', 'Arizona', 'Arkansas', 'California',
  'Colorado', 'Connecticut', 'Delaware', 'Florida', 'Georgia',
  'Hawaii', 'Idaho', 'Illinois', 'Indiana', 'Iowa',
  'Kansas', 'Kentucky', 'Louisiana', 'Maine', 'Maryland',
  'Massachusetts', 'Michigan', 'Minnesota', 'Mississippi', 'Missouri',
  'Montana', 'Nebraska', 'Nevada', 'New Hampshire', 'New Jersey',
  'New Mexico', 'New York', 'North Carolina', 'North Dakota', 'Ohio',
  'Oklahoma', 'Oregon', 'Pennsylvania', 'Rhode Island', 'South Carolina',
  'South Dakota', 'Tennessee', 'Texas', 'Utah', 'Vermont',
  'Virginia', 'Washington', 'West Virginia', 'Wisconsin', 'Wyoming',
] as const

export const TCPA_TEXT =
  'By clicking "{cta}," I expressly consent via electronic signature to receive marketing communications regarding insurance products and services via an automated telephone dialing system and/or pre-recorded calls, text messages, and/or emails from InvestorSimple and one or more of its marketing partners at the phone number and/or email provided above, including wireless numbers, if applicable, even if I have previously registered the provided number on the Do Not Call Registry.'
