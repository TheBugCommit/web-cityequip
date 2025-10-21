import auth from "./auth.router.js";
import user from "./user.router.js"
import review from "./review.router.js"
import equipment from "./equipment.router.js"

const router = {
    auth: auth,
    user: user,
    review: review,
    equipment: equipment
}

export default router