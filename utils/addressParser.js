export function parseLocalitzacio(localitzacio) {
  if (!localitzacio || typeof localitzacio !== 'string') return {}

  const regex = /^(?:(CR|PL|AV|C|PZ|PS)\s+)?([\p{L}0-9][\p{L}0-9\s\-']*)\s+(\d+)\s*(?:BLQ:\s*([\p{L}0-9]{1,4})\s*)?(?:ESC:\s*([\p{L}0-9]{1,4})\s*)?(?:PLNT:\s*([\p{L}0-9]{1,4})\s*)?(?:PRT:\s*([\p{L}0-9]{1,4})\s*)?CP:\s*(\d{5})$/iu
  const match = localitzacio.match(regex)
  if (!match) return {}

  const [
    ,
    prefix = '',
    street = '',
    number = '',
    block = '',
    staircase = '',
    floor = '',
    door = '',
    postalCode = ''
  ] = match

  return {
    prefix: prefix || '',
    street: street.trim(),
    number: number.trim(),
    block: block ? block.trim() : '',
    staircase: staircase ? staircase.trim() : '',
    floor: floor ? floor.trim() : '',
    door: door ? door.trim() : '',
    postalCode: postalCode.trim()
  }
}
