import home, { paths as homePaths } from "./home.routes.js"
import auth, { paths as authPaths } from "./auth.routes.js"
import user, { paths as userPaths } from "./user.routes.js"
import equipment, { paths as equipmentPaths } from "./equipment.routes.js"
import buildPaths from "../helpers/buildPaths.helper.js"

const prefixes = {
  home: '/',
  auth: '/auth',
  equipment: '/equipment',
  user: '/user'
}

const routes = {
    home: {
        prefix: prefixes.home,
        router: home,
        paths: buildPaths(prefixes.home, homePaths)
    },
    auth: {
        prefix: prefixes.auth,
        router: auth,
        paths: buildPaths(prefixes.auth, authPaths)
    },
    user: {
        prefix: prefixes.user,
        router: user,
        paths: buildPaths(prefixes.user, userPaths)
    },
    equipment: {
        prefix: prefixes.equipment,
        router: equipment,
        paths: buildPaths(prefixes.equipment, equipmentPaths)
    },
}

export default routes