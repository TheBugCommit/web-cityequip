const ADDRESS_PREFIXES = [
  'RB',
  'CR',
  'AV',
  'PG',
  'PL',
  'CM',
  'AC',
  'CT',
  'PE',
  'ML',
  'CL',
  'BL',
  'PR',
  'PJ',
  'DM',
  'C',
  'PZ',
  'PS'
]

const ADDRESS_LABELS = ['BLQ', 'ESC', 'PLNT', 'PRT']

const ADDRESS_PREFIXES_SORTED = ADDRESS_PREFIXES.slice().sort((a, b) => b.length - a.length)

const NUMBER_REGEX = /^(?:S\/N|\d+(?:[-/]\d+)?(?:\s*[A-Za-z0-9]+)*)$/i

const OPTIONAL_LABEL_CAPTURE = new RegExp(
  `\\b(${ADDRESS_LABELS.join('|')}):\\s*([^]*?)(?=\\b(?:${ADDRESS_LABELS.join('|')}|CP):|$)`,
  'gi'
)

const sanitizeSegment = (value) => {
  if (value === undefined || value === null) return ''
  if (typeof value === 'string') return value.trim()
  return value.toString().trim()
}

export function parseLocalitzacio(localitzacio) {
  if (!localitzacio || typeof localitzacio !== 'string') return {}

  const original = localitzacio.trim()
  if (!original) return {}

  let working = original

  let postalCode
  const cpMatch = working.match(/\bCP:\s*(\d{5})\b/i)
  if (cpMatch) {
    postalCode = cpMatch[1]
    working = (working.slice(0, cpMatch.index) + working.slice(cpMatch.index + cpMatch[0].length)).trim()
  }

  const labelValues = {}
  working = working.replace(OPTIONAL_LABEL_CAPTURE, (_, label, value) => {
    const clean = sanitizeSegment(value)
    if (clean) labelValues[label.toLowerCase()] = clean
    return ' '
  })

  working = working.replace(/\s+/g, ' ').trim()

  let prefix
  for (const candidate of ADDRESS_PREFIXES_SORTED) {
    if (working.toUpperCase().startsWith(`${candidate} `)) {
      prefix = candidate
      working = working.slice(candidate.length).trim()
      break
    }
  }

  let street = working
  let number = null
  const numberMatch = working.match(/^(.*\S)\s+((?:\d+(?:[-/]\d+)?(?:\s*[A-Za-z0-9]+)*)|S\/N)$/i)
  if (numberMatch) {
    street = numberMatch[1].trim()
    number = numberMatch[2].toUpperCase().replace(/\s+/g, ' ')
  }

  const result = {
    prefix: prefix || '',
    street: street || '',
    number: number || '',
    block: labelValues.blq || '',
    staircase: labelValues.esc || '',
    floor: labelValues.plnt || '',
    door: labelValues.prt || '',
    postalCode: postalCode || ''
  }

  if (!result.street) return {}

  if (result.number && !NUMBER_REGEX.test(result.number)) {
    result.number = ''
  }

  return result
}

