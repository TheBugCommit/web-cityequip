const baseMenu = [
  { slug: '/stores', title: 'Stores' },
  { slug: '/tags', title: 'Tags' },
  { slug: '/top', title: 'Top' },
  { slug: '/add', title: 'Add' },
]

export const getMenuForRole = (role = 'guest') => {
  if (role === 'admin') {
    return [...baseMenu, { slug: '/admin', title: 'Admin Panel' }]
  }

  if (role === 'user') {
    return baseMenu;
  }

  return baseMenu.filter(item => item.slug !== '/add')
}