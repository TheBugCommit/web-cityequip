import home, { paths as homePaths } from "./home.routes.js"
import auth, { paths as authPaths } from "./auth.routes.js"
import user, { paths as userPaths } from "./user.routes.js"
import equipment from "./equipment.routes.js"

const routes = {
    home: {
        router: home,
        paths: homePaths
    },
    auth: {
        router: auth,
        paths: authPaths
    },
    user: {
        router: user,
        paths: userPaths
    },
    equipment: equipment
}

export default routes