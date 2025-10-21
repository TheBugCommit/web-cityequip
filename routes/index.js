import home from "./home.routes.js"
import auth from "./auth.routes.js"
import user from "./user.routes.js"
import equipment from "./equipment.routes.js"

const router = {
    home: home,
    auth: auth,
    user: user,
    equipment: equipment
}

export default router