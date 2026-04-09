export default defineEventHandler((event) => {
  const url = event.node.req.url || ''
  if (url.startsWith('/api') || url.startsWith('/admin')) {
    setHeader(event, 'X-Robots-Tag', 'noindex, nofollow')
  }
})
