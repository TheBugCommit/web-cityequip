import { body } from 'express-validator'

const equipmentValidator = [
  body('nom')
    .trim().notEmpty().withMessage('El nom es obligatori')
    .isString().withMessage('El nom ha de ser una cadena'),

  body('horari')
    .trim().optional({ checkFalsy: true })
    .isString().withMessage('L\'horari ha de ser una cadena'),

  body('tipus')
    .trim().notEmpty().withMessage('El tipus és obligatori')
    .isString().withMessage('El tipus ha de ser una cadena'),

  body('municipal')
    .optional({ checkFalsy: true })
    .isIn(['true', 'false']).withMessage('El valor seleccionat no es valid'),

  body('latitud')
    .optional({ checkFalsy: true })
    .isFloat({ min: -90, max: 90 }).withMessage('Latitud invalida, entre -90 i 90')
    .toFloat(),

  body('longitud')
    .optional({ checkFalsy: true })
    .isFloat({ min: -180, max: 180 }).withMessage('Longitud invalida, entre -180 i 180')
    .toFloat(),

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
    .trim().notEmpty().withMessage('nom_ens es obligatori')
    .isString().withMessage('nom_ens ha de ser una cadena')
]

export default equipmentValidator
