const baseMenu = [
  //{ slug: '/', title: 'Equipments' },
  { slug: '/tags', title: 'Tags' },
  { slug: '/equipment/ranking/global', title: 'Ranking Global' },
]

const extraMenus = {
  add: { slug: '/equipment/new', title: 'Afegir equipament' },
  admin: { slug: '/admin', title: 'Panell Admin' },
}

const roleCapabilities = {
  admin: ['add', 'admin'],
  user: ['add'],
  guest: [],
}

export const getMenuForRole = (role = 'guest') => {
  const extras = roleCapabilities[role] || []
  const menu = [...baseMenu]

  for (const cap of extras) {
    if (extraMenus[cap]) menu.push(extraMenus[cap])
  }

  return menu
}
