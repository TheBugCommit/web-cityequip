import { Router } from "express";

const router = Router()

router.get('/', (req, res) => {
    res.render('extendingLayout')
})

export default router