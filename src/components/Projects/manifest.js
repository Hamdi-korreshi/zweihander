const modules = import.meta.glob('./*.md', { eager: true })

export const projectPages = Object.fromEntries(
  Object.entries(modules).map(([path, mod]) => {
    const slug = path.replace('./', '').replace(/\.md$/, '') // e.g. "btc-village"
    return [slug, mod.default]
  })
)

export const slugs = Object.keys(projectPages)
