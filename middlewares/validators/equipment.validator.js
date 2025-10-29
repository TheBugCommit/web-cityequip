import { body } from 'express-validator'

const equipmentValidator = [
  body('nom')
    .notEmpty().withMessage('El nom és obligatori')
    .isString().withMessage('El nom ha de ser una cadena'),

  body('horari')
    .optional({ checkFalsy: true })
    .isString().withMessage('L\'horari ha de ser una cadena'),

  body('tipus')
    .optional({ checkFalsy: true })
    .isString().withMessage('El tipus ha de ser una cadena'),

  body('municipal')
    .optional({ checkFalsy: true })
    .isIn(['si', 'no']).withMessage('El valor seleccionat no és valid'),

  body('latitud')
    .optional({ checkFalsy: true })
    .isFloat({ min: -90, max: 90 }).withMessage('Latitud invàlida, entre -90 i 90')
    .toFloat(),

  body('longitud')
    .optional({ checkFalsy: true })
    .isFloat({ min: -180, max: 180 }).withMessage('Longitud invàlida, entre -180 i 180')
    .toFloat(),

  body('localitzacio')
    .optional({ checkFalsy: true })
    .isString().withMessage('La localització ha de ser una cadena'),

  body('telefon')
    .optional({ checkFalsy: true })
    .matches(/^\d{9}$/).withMessage('Número de telefon invàlid'),

  body('districte')
    .optional({ checkFalsy: true })
    .isString().withMessage('El districte ha de ser una cadena'),

  body('codi_ens')
    .optional({ checkFalsy: true })
    .matches(/^\d{10}$/).withMessage('codi_ens invàlid'),

  body('nom_ens')
    .notEmpty().withMessage('nom_ens és obligatori')
    .isString().withMessage('nom_ens ha de ser una cadena')
]

export default equipmentValidator