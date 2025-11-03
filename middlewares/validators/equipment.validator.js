import { body } from 'express-validator'

const ADDRESS_PREFIXES = ['CR', 'PL', 'AV', 'C', 'PZ', 'PS']
const OPTIONAL_FIELD_REGEX = /^[\p{L}0-9]{1,4}$/u
const NUMBER_REGEX = /^\d+$/
const POSTAL_CODE_REGEX = /^\d{5}$/

const sanitizeSegment = (value) => {
  if (value === undefined || value === null) return ''
  if (typeof value === 'string') return value.trim()
  return value.toString().trim()
}

const equipmentValidator = [
  body('nom')
    .notEmpty().withMessage('El nom es obligatori')
    .isString().withMessage('El nom ha de ser una cadena'),

  body('horari')
    .optional({ checkFalsy: true })
    .isString().withMessage('L\'horari ha de ser una cadena'),

  body('tipus')
    .optional({ checkFalsy: true })
    .isString().withMessage('El tipus ha de ser una cadena'),

  body('municipal')
    .optional({ checkFalsy: true })
    .isIn(['si', 'no']).withMessage('El valor seleccionat no es valid'),

  body('latitud')
    .optional({ checkFalsy: true })
    .isFloat({ min: -90, max: 90 }).withMessage('Latitud invalida, entre -90 i 90')
    .toFloat(),

  body('longitud')
    .optional({ checkFalsy: true })
    .isFloat({ min: -180, max: 180 }).withMessage('Longitud invalida, entre -180 i 180')
    .toFloat(),

  body('address')
    .custom((value, { req }) => {
      if (!value || typeof value !== 'object' || Array.isArray(value)) {
        throw new Error('Cal informar l\'adreca')
      }

      const prefix = sanitizeSegment(value.prefix).toUpperCase()
      if (prefix && !ADDRESS_PREFIXES.includes(prefix)) {
        throw new Error('Prefix de via invalid')
      }

      const street = sanitizeSegment(value.street)
      const number = sanitizeSegment(value.number)
      const block = sanitizeSegment(value.block)
      const staircase = sanitizeSegment(value.staircase)
      const floor = sanitizeSegment(value.floor)
      const door = sanitizeSegment(value.door)
      const postalCode = sanitizeSegment(value.postalCode)

      if (!street) throw new Error('Indica el carrer')
      if (!number) throw new Error('Indica el numero')
      if (!postalCode) throw new Error('Indica el codi postal')

      if (!NUMBER_REGEX.test(number)) {
        throw new Error('El numero ha de ser numeric')
      }

      const optionalFields = { block, staircase, floor, door }
      for (const [field, fieldValue] of Object.entries(optionalFields)) {
        if (fieldValue && !OPTIONAL_FIELD_REGEX.test(fieldValue)) {
          throw new Error(`El camp ${field} te un format invalid`)
        }
      }

      if (!POSTAL_CODE_REGEX.test(postalCode)) {
        throw new Error('El codi postal ha de tenir 5 digits')
      }

      req.body.address = {
        prefix: prefix || undefined,
        street,
        number,
        block: block || undefined,
        staircase: staircase || undefined,
        floor: floor || undefined,
        door: door || undefined,
        postalCode
      }

      return true
    }),

  body('localitzacio')
    .optional({ checkFalsy: true })
    .isString().withMessage('La localitzacio ha de ser una cadena'),

  body('telefon')
    .optional({ checkFalsy: true })
    .matches(/^\d{9}$/).withMessage('Numero de telefon invalid'),

  body('districte')
    .optional({ checkFalsy: true })
    .isString().withMessage('El districte ha de ser una cadena'),

  body('codi_ens')
    .optional({ checkFalsy: true })
    .matches(/^\d{10}$/).withMessage('codi_ens invalid'),

  body('nom_ens')
    .notEmpty().withMessage('nom_ens es obligatori')
    .isString().withMessage('nom_ens ha de ser una cadena')
]

export default equipmentValidator

