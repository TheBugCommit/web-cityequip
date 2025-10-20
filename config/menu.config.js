const baseMenu = [
  { slug: '/stores', title: 'Stores' },
  { slug: '/tags', title: 'Tags' },
  { slug: '/top', title: 'Top' },
]

const extraMenus = {
  add: { slug: '/add', title: 'Add' },
  admin: { slug: '/admin', title: 'Admin Panel' },
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
